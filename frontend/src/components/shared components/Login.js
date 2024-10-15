import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { UserContext } from "../../App";

import Button from '@mui/material/Button';



const Login = () => {
  
  const user = useContext(UserContext);
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /////////////////////////////////////////////
 useEffect(()=>{ user.setIsLoggedIn(false)
    user.setUserId("")
    user.setToken("")
    user.setMyInfo("")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("isLoggedIn")},[])
////////////////////////////////////////////////
  const goToLogin = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("userId",result.data.userId)
        sessionStorage.setItem("isLoggedIn",true)
        sessionStorage.setItem("user",result.data.user)
        sessionStorage.setItem("myName",result.data.user.fullName)



        user.setToken(result.data.token);
        user.setUserId(result.data.userId)
        user.setIsLoggedIn(true)
        user.setMyInfo(result.data.user)
        user.setMyName(result.data.user.fullName)


        if (result.data.role.role === "USER") {
          Navigate("/userDashboard");
        } else {
          Navigate("/adminDashboard");
        }
      })
      .catch((err) => {
        console.log("failed");
      }); //
  };
  return (
    <>
    <h1>login</h1><br></br>
      <TextField
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="Email"
        label="email"
        variant="outlined"
      />
      <br />
      <br />
      <TextField
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="Password"
        label="password"
        variant="outlined"
      />
      <br />

      <Button onClick={goToLogin}>login</Button>
      <br />
      <Button
        onClick={() => {
          Navigate("/register");
        }}
      >
        Create New Acount
      </Button>
      <br />
    </>
  );
};

export default Login;
