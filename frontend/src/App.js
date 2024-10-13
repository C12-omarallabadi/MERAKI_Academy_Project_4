import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import AdminDashboard from "./components/role 1 interface/AdminDashboard";
import UserDashboard from "./components/role 2 interface/UserDashboard";
import Navbar from "./components/shared components/Navbar";
import MyAcount from "./components/role 2 interface/MyAcount";
export const UserContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") || false
  );
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || "");
  const Navigate = useNavigate();
  return (
    <div className="App">
      <UserContext.Provider
        value={{
          token,
          setToken,
          userId,
          setUserId,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <Navbar />
        <br></br>
        <br></br>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/myAcount" element={<MyAcount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
