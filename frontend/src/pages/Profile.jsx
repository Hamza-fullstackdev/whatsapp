import React from "react";
import ProfileUi from "../components/ProfileUi";
import ProfileSidebar from "../components/ProfileSidebar";

const Profile = () => {
  return (
    <div className="flex flex-row items-start">
      <ProfileSidebar />
      <ProfileUi/>
    </div>
  );
};

export default Profile;
