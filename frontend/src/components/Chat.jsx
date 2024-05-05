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
  const data = props.apiData;
  return (
    <div
      className='w-full overflow-auto'
      style={{
        height: "100vh",
        background: `${theme === "light" ? "#E7DFDC" : "rgb(42,65,81,1)"}`,
      }}
    >
      <div
        className='flex flex-row items-center justify-between relative'
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
      <div style={{ padding: "0 90px", marginTop: "70px" }}>
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
        <div className='w-max mt-3'>
          <p
            className='py-1 px-3 text-sm rounded-md'
            style={{
              background: "white",
              color: `${theme === "light" ? "black" : "rgb(42,65,81,1)"}`,
            }}
          >
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3 ml-auto'>
          <p
            style={{
              background: "#DCF8C6",
              color: `${theme === "light" ? "black" : "rgb(42,65,81,1)"}`,
            }}
            className='py-1 px-3 text-sm rounded-md'
          >
            Hello From Hamza
          </p>
        </div>
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
          <TextInput placeholder="What's on your mind?" />
        </div>
        <div className='ml-3'>
          <IoSend />
        </div>
      </div>
    </div>
  );
};

export default Chat;
