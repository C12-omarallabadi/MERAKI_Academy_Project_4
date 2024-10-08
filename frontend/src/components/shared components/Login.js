import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Login = () => {
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
        console.log("done");
      })
      .catch((err) => {
        console.log("failed");
      });//
  };

  return (
    <>
      <h1>register</h1>

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
