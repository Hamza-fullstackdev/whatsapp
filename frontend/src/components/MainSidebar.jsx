import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, TextInput } from "flowbite-react";
import { BsChatLeftTextFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { logoutFailure, logoutSuccess } from "../redux/user/userSlice";
const MainSidebar = () => {
  const [usersData, setUsersData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  useEffect(() => {
    getAllusers();
  }, []);
  useEffect(() => {
    const searchUsers = async () => {
      try {
        if (query) {
          const res = await fetch(`/api/user/search?query=${query}`);
          const data = await res.json();
          setSearchUser(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchUsers();
  }, [query]);
  const getAllusers = async () => {
    try {
      const res = await fetch("api/user/all-users");
      const data = await res.json();
      setUsersData(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout=async()=>{
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if(res.ok){
        dispatch(logoutSuccess());
        navigate('/login');
      }
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  }
  const filterUsers = usersData.filter((user) => user._id !== currentUser._id);
  const searchFilter = searchUser.filter(
    (user) => user._id !== currentUser._id
  );
  return (
    <div
      className='shadow-md'
      style={{
        minWidth: "320px",
        height: "100vh",
        borderRight: "1px solid #80808026",
        overflow: "auto",
      }}
    >
      <div
        className='flex flex-row items-center justify-between dark:text-white'
        style={{
          background: `${theme === "light" ? "#EEEEEE" : "rgb(42,65,81,1)"}`,
          padding: "8px 15px",
        }}
      >
        <div>
          <Link to={`/profile/${currentUser._id}`}>
            <Avatar img={currentUser.profileimg} rounded status="online"></Avatar>
          </Link>
        </div>
        <div className='flex items-center'>
          <Link style={{ marginRight: "35px" }}>
            {" "}
            <BsChatLeftTextFill />
          </Link>
          <Dropdown inline arrowIcon={false} label={<SlOptionsVertical />}>
            <Dropdown.Header>
              <h3 className='font-semibold'>
                {currentUser.fname} {currentUser.lname}
              </h3>
              <p className='text-sm'>
                {currentUser.country === "Pakistan" ? "+92" : ""}{" "}
                {currentUser.phone}
              </p>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to={`/profile/${currentUser._id}`}>Profile</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => dispatch(toggleTheme())}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div>
        <TextInput
          className='py-1'
          icon={CiSearch}
          placeholder='Search or start a new chat'
          onChange={(e) => setQuery(e.target.value)}
          style={{
            borderRadius: 0,
            background: `${theme === "light" ? "white" : "rgb(42,65,81,1)"}`,
            border: "none",
          }}
        />
      </div>
      <div>
        {searchFilter.length > 0
          ? searchFilter.map((item) => {
              return (
                <Link
                  key={item._id}
                  to={`/chat?chat=${item._id}`}
                  className='cursor-default'
                >
                  <div
                    className='flex flex-row items-start justify-between px-3 py-2'
                    style={{
                      background: `${
                        theme === "light" ? "white" : "rgb(42,65,81,1)"
                      }`,
                      borderTop: `1px solid ${
                        theme === "light" ? "#80808026" : "white"
                      }`,
                    }}
                  >
                    <div className='w-fit'>
                      <Avatar img={item.profileimg.slice(0,30)} rounded></Avatar>
                    </div>
                    <div style={{ width: "200px" }}>
                      <h5 className='text-md font-semibold'>
                        {item.fname} {item.lname}
                      </h5>
                      <p className='text-sm'>{item.about}</p>
                    </div>
                    <div className='w-fit'>
                      <span
                        className='text-sm'
                        style={{
                          color: `${theme === "light" ? "#0000008a" : "white"}`,
                        }}
                      >
                        12:40
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          : filterUsers.map((item) => {
              const isOnline=onlineUsers.includes(item._id)
              return (
                <Link
                  key={item._id}
                  to={`/chat?chat=${item._id}`}
                  className='cursor-default'
                >
                  <div
                    className='flex flex-row items-start justify-between px-3 py-2'
                    style={{
                      background: `${
                        theme === "light" ? "white" : "rgb(42,65,81,1)"
                      }`,
                      borderTop: `1px solid ${
                        theme === "light" ? "#80808026" : "white"
                      }`,
                    }}
                  >
                    <div className='w-fit'>
                      <Avatar img={item.profileimg} rounded status={isOnline?"online":''}></Avatar>
                    </div>
                    <div style={{ width: "200px" }}>
                      <h5 className='text-md font-semibold'>
                        {item.fname} {item.lname}
                      </h5>
                      <p className='text-sm'>{item.about.slice(0,30)}</p>
                    </div>
                    <div className='w-fit'>
                      <span
                        className='text-sm'
                        style={{
                          color: `${theme === "light" ? "#0000008a" : "white"}`,
                        }}
                      >
                        12:40
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default MainSidebar;
