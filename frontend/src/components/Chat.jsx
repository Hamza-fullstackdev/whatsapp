import React, { useEffect, useState } from "react";
import { Avatar, TextInput } from "flowbite-react";
import { SlOptionsVertical } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
const Chat = (props) => {
  const data= props.apiData;
  return (
    <div
      className='w-full overflow-auto'
      style={{ height: "100vh", background: "#E7DFDC" }}
    >
      <div
        className='flex flex-row items-center justify-between relative'
        style={{
          background: "#EEEEEE",
          padding: "4px 20px",
          position: "absolute",
          top: "0",
          width: "-webkit-fill-available",
        }}
      >
        <div className='flex flex-row items-center'>
          <Avatar img={data.profileimg} rounded></Avatar>
          <div className='ml-3'>
            <h3 className='font-semibold'>{data.fname} {data.lname}</h3>
            <span className='text-sm'>Online</span>
          </div>
        </div>
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
          <h3 className='bg-white py-1 px-3 text-sm rounded-md'>Today</h3>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3 ml-auto'>
          <p
            style={{ background: "#DCF8C6" }}
            className='py-1 px-3 text-sm rounded-md'
          >
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='mx-auto w-max mt-3'>
          <h3 className='bg-white py-1 px-3 text-sm rounded-md'>Today</h3>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3 ml-auto'>
          <p
            style={{ background: "#DCF8C6" }}
            className='py-1 px-3 text-sm rounded-md'
          >
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='mx-auto w-max mt-3'>
          <h3 className='bg-white py-1 px-3 text-sm rounded-md'>Today</h3>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3 ml-auto'>
          <p
            style={{ background: "#DCF8C6" }}
            className='py-1 px-3 text-sm rounded-md'
          >
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='mx-auto w-max mt-3'>
          <h3 className='bg-white py-1 px-3 text-sm rounded-md'>Today</h3>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3 ml-auto'>
          <p
            style={{ background: "#DCF8C6" }}
            className='py-1 px-3 text-sm rounded-md'
          >
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='mx-auto w-max mt-3'>
          <h3 className='bg-white py-1 px-3 text-sm rounded-md'>Today</h3>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3 ml-auto'>
          <p
            style={{ background: "#DCF8C6" }}
            className='py-1 px-3 text-sm rounded-md'
          >
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3 ml-auto'>
          <p
            style={{ background: "#DCF8C6" }}
            className='py-1 px-3 text-sm rounded-md'
          >
            Hello From Hamza
          </p>
        </div>
        <div className='w-max mt-3'>
          <p className='bg-white py-1 px-3 text-sm rounded-md'>
            Hello From Hamza
          </p>
        </div>
      </div>
      <div
        className='flex flex-row items-center justify-between px-5 py-2'
        style={{
          background: "#EBE9E7",
          position: "absolute",
          bottom: "0",
          width: "-webkit-fill-available",
        }}
      >
        <div className='mr-3'>
          <MdOutlineEmojiEmotions className='text-lg' />
        </div>
        <div className='w-full'>
          <TextInput />
        </div>
        <div className='ml-3'>
          <IoSend />
        </div>
      </div>
    </div>
  );
};

export default Chat;
