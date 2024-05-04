import { Avatar, Label, TextInput } from "flowbite-react";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

const ProfileUi = () => {
  return (
    <div
      className='w-full flex justify-center items-center relative'
      style={{ height: "100vh" }}
    >
      <h2 className="flex items-center absolute text-2xl font-semibold" style={{top:'5%', left:'10%',color:'#51A985'}}> <span className="mr-2"><IoArrowBackSharp/></span> Your Profile</h2>
      <div style={{minWidth:'350px'}}>
        <div>
          <Avatar
            size={"xl"}
            rounded
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFq_O4Hn8W7WKdakJMSYMpPLi-EhhYpxHIEVcAXBxMvQ&s"
            }
          ></Avatar>
        </div>
        <div className="mt-2">
          <Label style={{color:'#51A985',fontSize:'16px'}}>Name:</Label>
          <TextInput icon={FaRegUser}/>
        </div>
        <div className="mt-2">
          <Label style={{color:'#51A985',fontSize:'16px'}}>About:</Label>
          <TextInput icon={FaPen}/>
        </div>
        <div className="mt-2">
          <Label style={{color:'#51A985',fontSize:'16px'}}>Phone:</Label>
          <TextInput icon={FaPhoneAlt} type="tel"/>
        </div>
      </div>
    </div>
  );
};

export default ProfileUi;
