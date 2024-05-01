import React from "react";
import { Avatar, TextInput } from "flowbite-react";
import { BsChatLeftTextFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const MainSidebar = () => {
  const array=[1,2,3,4,5,6,7,8,8,8,8,8,12,1,1,1,1,1,1,1,1,1,1,1];
  return (
    <div style={{minWidth: "320px", height: "100vh",borderRight: '1px solid #80808026', overflow: 'auto' }}>
      <div
        className='flex flex-row items-center justify-between'
        style={{ background: "#E3E8EC", padding: "8px 15px" }}
      >
        <div>
          <Avatar
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFq_O4Hn8W7WKdakJMSYMpPLi-EhhYpxHIEVcAXBxMvQ&s"
            }
            rounded
          ></Avatar>
        </div>
        <div className='flex items-center'>
          <Link style={{ marginRight: "35px" }}>
            {" "}
            <BsChatLeftTextFill />
          </Link>
          <Link>
            {" "}
            <SlOptionsVertical />
          </Link>
        </div>
      </div>
      <div>
        <TextInput
        className="py-1"
          icon={CiSearch}
          placeholder='Search or start a new chat'
          style={{ borderRadius: 0, background: "white", border: "none" }}
        />
      </div>
      <div>
        {
          array.map((item)=>(
            <div
            className='flex flex-row items-start justify-between px-3 py-2'
            style={{ background: "white", borderTop: "1px solid #80808026" }}
          >
            <div className='w-fit'>
              <Avatar
                img={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFq_O4Hn8W7WKdakJMSYMpPLi-EhhYpxHIEVcAXBxMvQ&s"
                }
                rounded
              ></Avatar>
            </div>
            <div style={{ width: "200px" }}>
              <h5 className='text-md font-semibold'>Hamza Ilyas</h5>
              <p className='text-sm'>Hamza is a good boy</p>
            </div>
            <div className='w-fit'>
              <span className='text-sm' style={{color: '#0000008a'}}>12:40</span>
            </div>
          </div>
          ))
        }

      </div>
    </div>
  );
};

export default MainSidebar;
