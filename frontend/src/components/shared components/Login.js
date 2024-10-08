import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';




const Login = () => {
    const Navigate=useNavigate()
  return (
    <>
    
    <h1>register</h1>
    
     <TextField type="Email"  label="email" variant="outlined" /><br/><br/>
     <TextField type="Password"  label="password" variant="outlined" /><br/>

   
      <Button>login</Button><br/>
      <Button onClick={()=>{Navigate("/register")}}>Create New Acount</Button><br/>
   
     
      


    </>
  );
};

export default Login;
