import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToRegister = () => {
    axios
      .post("http://localhost:5000/users/register", {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
      })
      .then(() => {
        console.log("done");
      })
      .catch(() => {
        console.log("failed");
      });
  };
  const Navigate = useNavigate();
  return (
    <>
      <h1>register</h1>
      <TextField
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        label="First Name"
        variant="outlined"
      />
      <br />
      <TextField
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        label="Last Name"
        variant="outlined"
      />
      <br />
      <TextField
        onChange={(e) => {
          setAge(e.target.value);
        }}
        label="Age"
        variant="outlined"
      />
      <br />
      <TextField
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="Email"
        label="Email"
        variant="outlined"
      />
      <br />
      <TextField
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        label="Password"
        variant="outlined"
      />
      <br />

      <Button onClick={goToRegister}>register</Button>
      <br />
      <Button
        onClick={() => {
          Navigate("/login");
        }}
      >
        i already have an acount
      </Button>
    </>
  );
};

export default Register;
