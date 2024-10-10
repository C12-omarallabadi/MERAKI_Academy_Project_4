import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { UserContext } from "../../App";

const Login = () => {
  const user = useContext(UserContext);
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const goToLogin = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        user.setToken(result.data.token);

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
