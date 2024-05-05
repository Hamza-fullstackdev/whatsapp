import { Avatar, Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

const ProfileUi = (props) => {
  const currentUser = props.currentUser;
  return (
    <div
      className='w-full flex justify-center items-center relative'
      style={{ height: "100vh" }}
    >
      <h2
        className='flex items-center absolute text-2xl font-semibold'
        style={{ top: "5%", left: "10%", color: "#51A985" }}
      >
        {" "}
        <span className='mr-2'>
          <IoArrowBackSharp />
        </span>{" "}
        Your Profile
      </h2>
      <form style={{ minWidth: "350px" }}>
        <div>
          <Avatar size={"xl"} rounded img={currentUser.profileimg}></Avatar>
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>
            First Name:
          </Label>
          <TextInput icon={FaRegUser} defaultValue={currentUser.fname} />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>
            Last Name:
          </Label>
          <TextInput icon={FaRegUser} defaultValue={currentUser.lname} />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>About:</Label>
          <TextInput icon={FaPen} defaultValue={currentUser.about} />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>Phone:</Label>
          <TextInput
            icon={FaPhoneAlt}
            type='tel'
            defaultValue={currentUser.phone}
          />
        </div>
        <div className='mt-2 flex flex-col'>
          <Button style={{ background: "#51A985" }}>Update</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUi;
