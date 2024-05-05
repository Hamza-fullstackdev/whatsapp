import { Alert, Avatar, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

const ProfileUi = (props) => {
  const currentUser = props.currentUser;
  const [formData, setFormData] = useState({});
  const [error,setError]= useState(false);
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/user/update-user/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if(res.ok){
        setSuccess(true);
        setErrorMessage("Profile Updated Successfully!");
      }
      if(!res.ok){
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <form style={{ width: "400px" }} onSubmit={handleFormData}>
        {error && <Alert color={'failure'}>{errorMessage}</Alert>}
        {success && <Alert color={'success'}>{errorMessage}</Alert>}
        <div>
          <Avatar size={"xl"} rounded img={currentUser.profileimg}></Avatar>
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>
            First Name:
          </Label>
          <TextInput
            icon={FaRegUser}
            defaultValue={currentUser.fname}
            onChange={handleSubmit}
            id='fname'
          />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>
            Last Name:
          </Label>
          <TextInput
            icon={FaRegUser}
            defaultValue={currentUser.lname}
            onChange={handleSubmit}
            id='lname'
          />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>About:</Label>
          <TextInput
            icon={FaPen}
            defaultValue={currentUser.about}
            onChange={handleSubmit}
            id='about'
          />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985", fontSize: "16px" }}>Phone:</Label>
          <TextInput
            icon={FaPhoneAlt}
            type='tel'
            defaultValue={currentUser.phone}
            onChange={handleSubmit}
            id='phone'
          />
        </div>
        <div className='mt-2 flex flex-col'>
          <Button style={{ background: "#51A985" }} type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUi;
