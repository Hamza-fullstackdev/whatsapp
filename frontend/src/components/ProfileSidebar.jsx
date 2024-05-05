import React from "react";
import { Avatar } from "flowbite-react";
import { MdOutlinePermMedia } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const ProfileSidebar = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const { currentUser: current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentUser = props.currentUser;
  return (
    <div
      className='w-[300px] min-h-screen'
      style={{
        background: `${theme === "light" ? "#51A985" : "rgb(42,65,81,1)"}`,
        borderRight: `1px solid ${theme === "light" ? "#51A985" : "#51A985"}`,
        minWidth: "320px",
        height: "100vh",
      }}
    >
      <div style={{ marginTop: "20px", padding: "0 20px" }}>
        <div>
          <Avatar size={"xl"} rounded img={currentUser.profileimg}></Avatar>
        </div>
        <div className='text-center text-white mt-2'>
          <h3 className='text-xl'>
            {currentUser.fname} {currentUser.lname}
          </h3>
          <p className='text-sm'>
            {currentUser.country === "Pakistan" ? "+92" : "+231"}{" "}
            {currentUser.phone}
          </p>
        </div>
        <div className='mt-4'>
          {currentUser._id === current._id ? (
            <div
              className='flex flex-row items-center justify-center border border-black p-2 cursor-pointer mt-2'
              onClick={() => dispatch(toggleTheme())}
            >
              <MdOutlinePermMedia className='text-white' />
              <h3 className='ml-3 text-white text-sm'>
                Enable {theme === "light" ? "Dark" : "Light"} Mode
              </h3>
            </div>
          ) : (
            ""
          )}

          <div className='flex flex-row items-center justify-center border border-black p-2 cursor-pointer mt-2'>
            <MdOutlinePermMedia className='text-white' />
            <h3 className='ml-3 text-white text-sm'>Media, Files and Links</h3>
          </div>
          <div className='flex flex-row items-center justify-center border border-black p-2 cursor-pointer mt-2'>
            <MdOutlinePermMedia className='text-white' />
            <h3 className='ml-3 text-white text-sm'>
              Notifications And Sounds
            </h3>
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