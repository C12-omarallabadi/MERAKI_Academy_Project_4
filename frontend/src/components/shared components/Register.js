import React, { useState,useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { UserContext } from "../../App";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";


const Register = () => {
  const theme=useTheme()

const user=useContext(UserContext)
  const Navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////



  const goToRegister = () => {
    axios
      .post("http://localhost:5000/users/register", {
       
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
      })
      .then((result) => {


        console.log("done");
        Navigate("/")
      })
      .catch((err) => {
        console.log("failed");
      });
  };
  return (
    <Box sx={{background:theme.palette.omar.light,height:`100vh`}}>
    
<Typography sx={{fontSize:`${10}vh`, fontWeight:"bold",color:"#0288d1"}}>Echoo</Typography>
<Paper elevation={4} sx={{display:"inline-flex",padding:"20px",flexDirection:"column",gap: `${1.5}vh`,width:`${30}vw`,alignItems:"center"}}>  
  <Typography sx={{fontSize:`${1.9}vw`,fontWeight:"bold"}}>Create a new account</Typography>
  <Typography>It’s quick and easy.</Typography>
<Divider/>  
 <TextField sx={{width:"100%"}}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
       placeholder="First Name"
        variant="outlined"
      />
    
      <TextField sx={{width:"100%"}}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        placeholder="Last Name"
        variant="outlined"
      />
      
      <TextField sx={{width:"100%"}}
        onChange={(e) => {
          setAge(e.target.value);
        }}
       placeholder="Age"
        variant="outlined"
      />
      
      <TextField sx={{width:"100%"}}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="Email"
       placeholder="Email"
        variant="outlined"
      />
    
      <TextField sx={{width:"100%"}}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
      placeholder="Password"
        variant="outlined"
      />
  

      <Button sx={{width:`${15}vw`,background:" #2e7d32", padding:`${.7}vw`}} variant="contained" onClick={goToRegister}>register</Button>
     
      <Button
        onClick={() => {
          Navigate("/");
        }}
      >
       Already have an acount?
      </Button>
      </Paper> 
    </Box>
  );
};

export default Register;
