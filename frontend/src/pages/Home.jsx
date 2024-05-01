import React from "react";
import MainSidebar from "../components/MainSidebar";
import MainChats from "../components/MainChats";

const Home = () => {
  return (
    <div className="flex flex-row items-start">
      <MainSidebar />
      <MainChats/>
    </div>
  );
};

export default Home;
