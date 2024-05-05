import { Alert, Avatar, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";

const ProfileUi = (props) => {
  const currentUser = props.currentUser;
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update-user/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setShowSuccessMessage("Profile Updated Successfully");
        dispatch(updateSuccess(data));
      }
      if (!res.ok) {
        setSuccess(false);
        dispatch(updateFailure(data.message));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
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
        {error && <Alert color={"failure"}>{error}</Alert>}
        {success && <Alert color={"success"}>{showSuccessMessage}</Alert>}
        <div>
          <Avatar size={"xl"} rounded img={currentUser.profileimg}></Avatar>
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985" }}>First Name:</Label>
          <TextInput
            icon={FaRegUser}
            defaultValue={currentUser.fname}
            onChange={handleSubmit}
            id='fname'
          />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985" }}>Last Name:</Label>
          <TextInput
            icon={FaRegUser}
            defaultValue={currentUser.lname}
            onChange={handleSubmit}
            id='lname'
          />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985" }}>About:</Label>
          <TextInput
            icon={FaPen}
            defaultValue={currentUser.about}
            onChange={handleSubmit}
            id='about'
          />
        </div>
        <div className='mt-2'>
          <Label style={{ color: "#51A985" }}>Phone:</Label>
          <TextInput
            icon={FaPhoneAlt}
            type='tel'
            defaultValue={currentUser.phone}
            onChange={handleSubmit}
            id='phone'
          />
        </div>
        <div className='mt-2 flex flex-col'>
          <Button style={{ background: "#51A985" }} type='submit'>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUi;
