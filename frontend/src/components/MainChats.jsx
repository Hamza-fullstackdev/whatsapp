import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Welcome from "./Welcome";
import Chat from "./Chat";

const MainChats = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("chat");
    if (tabFromUrl !== tab) {
      setTab(tabFromUrl);
    }
  }, [location.search, tab]);

  useEffect(() => {
    if (tab) {
      getSingleUser();
    }
  }, [tab]);
  const getSingleUser = async () => {
    try {
      const res = await fetch(`/api/user/single-user/${tab}`);
      const result = await res.json();
      setUserData(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  return <>{tab == null ? <Welcome /> : <Chat apiData={userData} />}</>;
};

export default MainChats;
