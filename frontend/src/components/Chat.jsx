import React, { useEffect, useState } from "react";
import { Avatar, TextInput } from "flowbite-react";
import { SlOptionsVertical } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Chat = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const [message, setMessage] = useState("");
  const [getMessages, setGetMessage] = useState([]);
  const data = props.apiData;
  const tab = props.tab;

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/messages/get/${tab}`);
        const result = await res.json();
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
  }, [tab, message]);
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
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
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
          width: "-webkit-fill-available",
        }}
      >
        <Link to={`/profile/${data._id}`}>
          <div className='flex flex-row items-center'>
            <Avatar img={data.profileimg} rounded></Avatar>
            <div className='ml-3'>
              <h3 className='font-semibold'>
                {data.fname} {data.lname}
              </h3>
              <span className='text-sm'>Online</span>
            </div>
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
        {getMessages.map((message) => {
          return (
            <div
              key={message._id}
              className={`w-max mt-3 ${
                data._id === message.senderId ? "" : "ml-auto"
              }`}
            >
              <div
                className='py-1 px-3 text-sm rounded-md'
                style={{
                  textAlign: "end",
                  background: `${
                    data._id === message.senderId ? "white" : "#DCF8C6"
                  }`,
                  color: `${theme === "light" ? "black" : "rgb(42,65,81,1)"}`,
                }}
              >
                <p>{message.message}</p>
                <span className='text-xs'>{`${String(new Date(message.createdAt).getHours()).padStart(2, '0')}:${String(new Date(message.createdAt).getMinutes()).padStart(2, '0')}`}</span>
              </div>
            </div>
          );
        })}
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
          <MdOutlineEmojiEmotions className='text-lg' />
        </div>
        <div className='w-full'>
          <TextInput
            placeholder="What's on your mind?"
            onChange={(e) => setMessage(e.target.value)}
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
