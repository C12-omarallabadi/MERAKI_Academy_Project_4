import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import AdminDashboard from "./components/role 1 interface/AdminDashboard";
import UserDashboard from "./components/role 2 interface/UserDashboard";


const App = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    Navigate("/login");
  }, []);
  return (
    <div className="App">
      
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
      
    </div>
  );
};

export default App;
