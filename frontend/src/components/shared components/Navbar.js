import React, { useEffect } from "react";
import { useContext, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
const drawerWidth = 240;


////////////////////////////////////

const Navbar = () => {
  const user = useContext(UserContext);

  const headers = { Authorization: `Bearer ${user.token}` };
  const[users,setUsers]=useState([])
  
  const Navigate = useNavigate();
//////////////////////////////////////////////////////////////////////////////////////
useEffect(()=>{
  user.setMyInfo(sessionStorage.getItem("user"))
},[user.token])
////////////////////////////////////////////////////////////////////////////////
useEffect(()=>{
  axios
  .get(`http://localhost:5000/users`,{headers})
.then((result)=>{
  setUsers(result.data)
})
.catch((err)=>{
console.log(err)
})

},[])

 ///////////////////////////////////////////////////////////////////////////////////// 

 ////////////////////////////////////////renderusers/////////////////////////////////////////




 /////////////////////////////////////////////////////////////////////////////////////

  return (
    
      <Box sx={{textAlign:"start" } }>
       <AppBar sx={{  position:"fixed",top:0,ml:{md:`${drawerWidth}px`},width:{md:`calc(100% - ${drawerWidth}px)`},zIndex:1, }} >
        <Toolbar sx={{display:"flex" ,justifyContent:"space-between"} }>
          <IconButton onClick={()=>{user.setType("temporary");user.setDisplay("block")}}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display:{xs:"block",md:"none"} }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{mr:`${14}vw`}}>
            Echoo
          </Typography>
          <Stack spacing={2} sx={{ width: `${50}%`, mr:"11%"  }}>
  <Autocomplete
    id="free-solo-demo"
    options={users} 
    getOptionLabel={(option) => option.fullName} 
    filterOptions={(options, { inputValue }) => {
      if (inputValue === '') return [];
      return options.filter((option) => 
        option.fullName.toLowerCase().includes(inputValue.toLowerCase())
      );
    }}
    onChange={(event, value) => {
      if (value) {
        Navigate(`/profile/${value._id}`);
      }
    }}
    renderInput={(params) => <TextField sx={{background:blue[400]}} {...params} placeholder={`search`}  InputProps={{
      ...params.InputProps,
      
      endAdornment:null, 
    }}  />}
    renderOption={(props, option) => (
      <li {...props} key={option._id}>
        {option.fullName}
      </li>
    )}
  />
</Stack>
          
       <Box sx={{display:"flex"}}>
          <Typography variant="h6" component="div" sx={{mr:`${.5}vw`}} >
            {user.myName}
     </Typography>
   
   
     <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
     </Box>
         
        </Toolbar>
      </AppBar>
      </Box>
    
       
    
     
   
  );
};
export default Navbar;
