import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { UserContext } from "../../App";
import Alert from '@mui/material/Alert';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";







const Login = () => {
  const theme=useTheme()
  
  const user = useContext(UserContext);
  const Navigate = useNavigate();
  const [isError, setIsError] = useState(false);

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
        setPassword("");
setIsError(true)
      }); //
  };
  return (
    <Box sx={{background:theme.palette.omar.light,height:`100vh`,display:"flex",flexDirection:"column",justifyContent:"center",gap: `${10}vh`}}>
    <Box sx={{ display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
      <Box sx={{width:`${30}vw`,textAlign:"start"}}>
    <Typography sx={{fontSize:`${10}vh`, fontWeight:"bold",color:"#0288d1"}}>Echoo</Typography>
    <Typography sx={{fontSize:`${2}vw`}}>Let your voice resonate and connect with those around you.</Typography>
    </Box>

      
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",gap:`${2}vh`}}>
      <Paper sx={{display:"inline-flex",padding:"20px",flexDirection:"column",gap: `${2}vh`,width:`${30}vw`,alignItems:"center"}}>
      <TextField placeholder="Email" fullWidth
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="Email"
      
        variant="outlined"
      />
     
      <TextField placeholder="Password" fullWidth 
      value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="Password"
     
        variant="outlined"
      />
  

      <Button sx={{width:"100%"}} variant="contained" onClick={goToLogin}>login</Button>
     
      <Button variant="contained"sx={{width:`${15}vw`,background:" #2e7d32"}}
        onClick={() => {
          Navigate("/register");
        }}
      >
        Create New Acount
      </Button>
      </Paper>
      <Box sx={{display:"flex",justifyContent:"center"}}>
      {isError?<Alert sx={{display:"flex",alignItems:"center", position:"absolute"}} severity="error">incorrect email or password <IconButton aria-label="delete" onClick={()=>{setIsError(false)}}>
  <ClearIcon />
</IconButton></Alert>:null}
    
      </Box>
      </Box>
      
      
     
   
   </Box>
     
      </Box>
  );
};

export default Login;
