import React, { useState } from "react";
import { Avatar, Button, Modal } from "flowbite-react";
import { MdOutlinePermMedia } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutFailure,
  logoutSuccess,
} from "../redux/user/userSlice";

const ProfileSidebar = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const { currentUser: current, onlineUsers } = useSelector(
    (state) => state.user
  );
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const currentUser = props.currentUser;
  const isOnline = onlineUsers?.includes(currentUser._id);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      if (res.ok) {
        dispatch(logoutSuccess());
        navigate("/login");
      }
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteUserSuccess(data));
        navigate("/login");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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
          <Avatar
            size={"xl"}
            rounded
            img={currentUser.profileimg}
            status={isOnline ? "online" : "offline"}
          ></Avatar>
        </div>
        <div className='text-center text-white mt-2'>
          <h3 className='text-xl'>
            {currentUser.fname} {currentUser.lname}
          </h3>
          <p className='text-sm'>
            {currentUser.country === "Pakistan" ? "+92" : "+231"}{" "}
            {currentUser.phone}
          </p>
          <span
            className='font-semibold'
            style={{ color: `${theme === "light" ? "white" : "#51A985"}` }}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
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
          {currentUser._id === current._id ? (
            <div className='flex flex-col mt-3'>
              <Button
                style={{
                  color: "red",
                  background: "transparent",
                  border: "1px solid red",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            ""
          )}
          <Modal
            show={showModal}
            popup
            size={"md"}
            onClose={() => setShowModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='mx-auto text-gray-400 dark:text-gray-200 mb-4' />
                <h3 className='mb-5 text-lg text-gray-600 dark:text-gray-400'>
                  Are you sure you want to delete your account?
                </h3>
                <div className='flex flex-row justify-center gap-4'>
                  <Button color='failure' onClick={handleDeleteUser}>
                    Confirm
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    No, Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {currentUser._id === current._id ? (
            <div className='flex flex-col mt-3'>
              <Button
                style={{ background: "red" }}
                onClick={() => setShowModal(true)}
              >
                Delete Account
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
