import React, { useEffect, useState } from "react";
import { Avatar, TextInput } from "flowbite-react";
import { BsChatLeftTextFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MainSidebar = () => {
  const [usersData, setUsersData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  useEffect(() => {
    getAllusers();
  }, []);

  const getAllusers = async () => {
    try {
      const res = await fetch("api/user/all-users");
      const data = await res.json();
      setUsersData(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        minWidth: "320px",
        height: "100vh",
        borderRight: "1px solid #80808026",
        overflow: "auto",
      }}
    >
      <div
        className='flex flex-row items-center justify-between dark:text-white'
        style={{ background: `${theme==="light"?'#EEEEEE':'rgb(42,65,81,1)'}`, padding: "8px 15px" }}
        >
        <div>
          <Link to={`/profile/${currentUser._id}`}>
            <Avatar img={currentUser.profileimg} rounded></Avatar>
          </Link>
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
          className='py-1'
          icon={CiSearch}
          placeholder='Search or start a new chat'
          style={{ borderRadius: 0, background: `${theme==="light"?'white':'rgb(42,65,81,1)'}`, border: "none" }}
        />
      </div>
      <div>
        {usersData.map((item) => (
          <Link
            key={item._id}
            to={`/chat?chat=${item._id}`}
            className='cursor-default'
          >
            <div
              className='flex flex-row items-start justify-between px-3 py-2'
              style={{ background: `${theme==="light"?'white':'rgb(42,65,81,1)'}`, borderTop: `1px solid ${theme==="light"?'#80808026':"white"}` }}
            >
              <div className='w-fit'>
                <Avatar img={item.profileimg} rounded></Avatar>
              </div>
              <div style={{ width: "200px" }}>
                <h5 className='text-md font-semibold'>
                  {item.fname} {item.lname}
                </h5>
                <p className='text-sm'>Hamza is a good boy</p>
              </div>
              <div className='w-fit'>
                <span className='text-sm' style={{ color: `${theme==="light"?'#0000008a':'white'}` }}>
                  12:40
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainSidebar;
