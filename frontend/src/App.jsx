import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={"/chat"} element={<Home />} />
          </Route>
          <Route path={'*'} element={<h1>404 Page</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
