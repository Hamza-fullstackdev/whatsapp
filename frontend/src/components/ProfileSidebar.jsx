import React from "react";
import { Avatar } from "flowbite-react";
import { MdOutlinePermMedia } from "react-icons/md";

const ProfileSidebar = () => {
  return (
    <div
      className='w-[300px] min-h-screen'
      style={{ background: "#51A985", minWidth: "320px", height: "100vh" }}
    >
      <div style={{ marginTop: "20px",padding:'0 20px' }}>
        <div>
          <Avatar
            size={"xl"}
            rounded
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFq_O4Hn8W7WKdakJMSYMpPLi-EhhYpxHIEVcAXBxMvQ&s"
            }
          ></Avatar>
        </div>
        <div className="text-center text-white mt-2">
            <h3 className="text-xl">Hamza Ilyas</h3>
            <p className="text-sm">+92 3150706126</p>
        </div>
        <div className="mt-4">
          <div className='flex flex-row items-center justify-center border border-black p-2 cursor-pointer mt-2'>
            <MdOutlinePermMedia className='text-white' />
            <h3 className='ml-3 text-white text-sm'>Enable Dark Mode</h3>
          </div>
          <div className='flex flex-row items-center justify-center border border-black p-2 cursor-pointer mt-2'>
            <MdOutlinePermMedia className='text-white' />
            <h3 className='ml-3 text-white text-sm'>Media, Files and Links</h3>
          </div>
          <div className='flex flex-row items-center justify-center border border-black p-2 cursor-pointer mt-2'>
            <MdOutlinePermMedia className='text-white' />
            <h3 className='ml-3 text-white text-sm'>Notifications And Sounds</h3>
          </div>
          <div className='flex flex-row items-center justify-center border border-black p-2 cursor-pointer mt-2'>
            <MdOutlinePermMedia className='text-white' />
            <h3 className='ml-3 text-white text-sm'>Media Visibility</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
