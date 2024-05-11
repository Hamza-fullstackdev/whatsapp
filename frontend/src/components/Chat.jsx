import React, { useEffect, useRef, useState } from "react";
import { Avatar, TextInput, Toast } from "flowbite-react";
import { SlOptionsVertical } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import notificationSound from "../assets/notification.mp3";
const Chat = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const { onlineUsers } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [getMessages, setGetMessage] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState("");
  const chatBottomRef = useRef(null);
  const data = props.apiData;
  const tab = props.tab;
  const isOnline = onlineUsers?.includes(tab);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/messages/get/${tab}`);
        const result = await res.json();
        setLoading(false);
        if (res.ok) {
          setGetMessage(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (tab) {
      getMessages();
    }
  }, [tab]);

  useEffect(() => {
    if (socket) {
      socket?.on("newMessage", (newMessage) => {
        console.log(newMessage);
        setToast(true);
        setNewMessage(newMessage.message);
        const sound = new Audio(notificationSound);
        sound.play();
        setGetMessage((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  useEffect(() => {
    chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [getMessages]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);
  const sendMessage = async () => {
    try {
      const res = await fetch(`/api/messages/send/${data._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setGetMessage((prevMessages) => [...prevMessages, result]);
        setMessage("");
        setShowEmoji(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmojiClick = (selectedEmoji) => {
    setEmoji(selectedEmoji.emoji);
    setMessage(message + emoji);
  };
  return (
    <div
      className='w-full overflow-auto'
      style={{
        height: "100vh",
        background: `${theme === "light" ? "#E7DFDC" : "rgb(42,65,81,1)"}`,
      }}
    >
      <div
        className='flex flex-row items-center justify-between relative shadow-md'
        style={{
          background: `${theme === "light" ? "#EEEEEE" : "rgb(42,65,81,1)"}`,
          padding: "4px 20px",
          position: "absolute",
          top: "0",
          zIndex: 999,
          width: "-webkit-fill-available",
        }}
      >
        <Link to={`/profile/${data._id}`}>
          <div className='flex flex-row items-center'>
            {loading ? (
              <SkeletonTheme
                baseColor={theme === "light" ? "#00000036" : "#ffffff1f"}
                highlightColor={theme === "light" ? "#ffffff1f" : "#444"}
              >
                <Skeleton width={"50px"} height={"50px"} circle />
              </SkeletonTheme>
            ) : (
              <Avatar img={data.profileimg} rounded></Avatar>
            )}

            {loading ? (
              <SkeletonTheme
                baseColor={theme === "light" ? "#00000036" : "#ffffff1f"}
                highlightColor={theme === "light" ? "#ffffff1f" : "#444"}
              >
                <Skeleton width={100} count={2} />
              </SkeletonTheme>
            ) : (
              <div className='ml-3'>
                <h3 className='font-semibold'>
                  {data.fname} {data.lname}
                </h3>
                <span className='text-sm'>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className='flex flex-row items-center'>
          <div style={{ marginRight: "30px" }}>
            <IoSearch />
          </div>
          <div>
            <SlOptionsVertical />
          </div>
        </div>
      </div>
      <div
        style={{ padding: "0 90px", marginTop: "70px", marginBottom: "70px" }}
      >
        <div className='mx-auto w-max mt-3'>
          <h3
            className='py-1 px-3 text-sm rounded-md'
            style={{
              background: "white",
              color: `${theme === "light" ? "black" : "rgb(42,65,81,1)"}`,
            }}
          >
            Today
          </h3>
        </div>
        {loading ? (
          <SkeletonTheme
            baseColor={theme === "light" ? "#00000036" : "#ffffff1f"}
            highlightColor={theme === "light" ? "#ffffff1f" : "#444"}
          >
            <div className='mt-4'>
              {/* Render the same number of skeletons as messages */}
              {getMessages.map((message, index) => (
                <div
                  key={index}
                  className={`w-max mt-3 ${
                    data._id === message.senderId ? "" : "ml-auto"
                  }`}
                >
                  <Skeleton width={"200px"} height={"30px"} />
                </div>
              ))}
            </div>
          </SkeletonTheme>
        ) : getMessages.length > 0 ? (
          getMessages.map((message, index) => {
            const hours = new Date(message.createdAt).getHours();
            const minutes = new Date(message.createdAt).getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = String(minutes).padStart(2, "0");
            const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
            return (
              <div
                key={index}
                className={`w-max mt-3 ${
                  data._id === message.senderId ? "" : "ml-auto"
                }`}
              >
                <div
                  className='py-1 px-3 text-sm rounded-md'
                  style={{
                    display: "flex",
                    textAlign: "end",
                    background: `${
                      data._id === message.senderId ? "white" : "#DCF8C6"
                    }`,
                    color: `${theme === "light" ? "black" : "rgb(42,65,81,1)"}`,
                  }}
                >
                  <p>{message.message}</p>
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "12px",
                      marginTop: "6px",
                    }}
                  >
                    {timeString}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className='mx-auto w-max mt-4'>
            <h3
              className='py-1 px-3 text-sm rounded-md'
              style={{
                background: "#F4E9BE",
                color: `${theme === "light" ? "black" : "rgb(42,65,81,1)"}`,
              }}
            >
              You and {data.fname} {data.lname} doesn't start conversation yet
            </h3>
          </div>
        )}
        {toast && (
          <Toast style={{ position: "absolute", top: "60px", right: 0 }}>
            <FaTelegramPlane className='h-5 w-5 text-cyan-600 dark:text-cyan-500' />
            <div
              className='pl-4 text-sm font-normal'
              style={{ marginLeft: "10px" }}
            >
              <span>You have a new message</span>
              <p>
                <span className='font-semibold'>
                  {data.fname} {data.lname}: {newMessage}
                </span>
              </p>
            </div>
          </Toast>
        )}
        <div ref={chatBottomRef}></div>
      </div>

      <div
        className='flex flex-row items-center justify-between px-5 py-2'
        style={{
          background: `${theme === "light" ? "#EBE9E7" : "rgb(42,65,81,1)"}`,
          position: "absolute",
          bottom: "0",
          width: "-webkit-fill-available",
        }}
      >
        <div className='mr-3'>
          <MdOutlineEmojiEmotions
            className='text-lg cursor-pointer'
            onClick={() => setShowEmoji(!showEmoji)}
          />
          <EmojiPicker
            height={370}
            open={showEmoji}
            onEmojiClick={handleEmojiClick}
            style={{ position: "absolute", top: "-350px", zIndex: 99 }}
          />
        </div>
        <div className='w-full'>
          <TextInput
            placeholder="What's on your mind?"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await sendMessage();
                setMessage("");
                setShowEmoji(false);
              }
            }}
            value={message}
          />
        </div>
        <div className='ml-3' onClick={sendMessage}>
          <IoSend />
        </div>
      </div>
    </div>
  );
};

export default Chat;
