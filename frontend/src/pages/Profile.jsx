import React, { useEffect, useState } from "react";
import ProfileUi from "../components/ProfileUi";
import ProfileSidebar from "../components/ProfileSidebar";
import { useLocation, useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams()
  const [user,setUser]= useState([])
  console.log(params)
  useEffect(()=>{
    const getSingleUser= async ()=>{
      try {
        const res = await fetch(`/api/user/single-user/${params.id}`);
        const result = await res.json();
        setUser(result.user);
      } catch (error) {
        console.log(error);
      }
    }
    getSingleUser()
  },[])
  return (
    <div className='flex flex-row items-start'>
      <ProfileSidebar currentUser={user}/>
      <ProfileUi currentUser={user}/>
    </div>
  );
};

export default Profile;
