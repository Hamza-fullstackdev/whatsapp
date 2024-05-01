import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default ProtectedRoutes;
