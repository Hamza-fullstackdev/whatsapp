import React from "react";
import { useSelector } from "react-redux";

const Welcome = (pops) => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className='w-full flex justify-center items-center'
      style={{ height: "100vh", background: `${theme==="light"?'rgb(227 232 236 / 15%)':'rgb(42,65,81,1)'}` }}
    >
      <div className='text-center'>
        <h1 style={{ fontSize: "35px", color: "#51A985" }}>WhatsApp Web</h1>
        <p>
          Hi {currentUser.fname} {currentUser.lname}, Welcome From The Developer
          Of This Chat Application
        </p>
      </div>
    </div>
  );
};

export default Welcome;
