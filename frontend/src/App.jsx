import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socket/socketSlice";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/user/userSlice";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: currentUser._id,
        },
      });
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return ()=>socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [currentUser]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={"/chat"} element={<Home />} />
            <Route path={"/profile/:id"} element={<Profile />} />
          </Route>
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
