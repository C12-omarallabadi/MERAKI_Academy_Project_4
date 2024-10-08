import React,{useEffect} from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";


const App = () => {
  const Navigate=useNavigate()
  useEffect(()=>{Navigate("/login")},[])
  return (
    <div className="App">
       <Routes>
       <Route path="/login" element={<Login />} /> 
       <Route path="/register" element={<Register/>} /> 

      
      </Routes>
     
    </div>
  );
};

export default App;
