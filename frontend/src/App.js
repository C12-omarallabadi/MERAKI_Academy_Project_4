import React, { useEffect, useState,createContext } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import AdminDashboard from "./components/role 1 interface/AdminDashboard";
import UserDashboard from "./components/role 2 interface/UserDashboard";
import Navbar from "./components/shared components/Navbar" 
export const UserContext=createContext()


const App = () => {
  const [token,setToken]=useState(localStorage.getItem("token")||"")
  const Navigate = useNavigate();
  return (
    <div className="App">
      
      <UserContext.Provider value={{token,setToken}}>
       <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
      </UserContext.Provider>
      
    </div>
  );
};

export default App;
