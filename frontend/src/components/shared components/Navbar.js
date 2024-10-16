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
const drawerWidth = 240;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
//////////////////////////////////////
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));


///////////////////////////////////////
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


////////////////////////////////////

const Navbar = () => {
  const user = useContext(UserContext);

  const headers = { Authorization: `Bearer ${user.token}` };
  const[users,setUsers]=useState([])
  
  const [isSearchBoxShown, setIsSearchBoxShown] = useState(false);
const [inputValue,setInputValue]=useState("")
  const Navigate = useNavigate();
//////////////////////////////////////////////////////////////////////////////////////
useEffect(()=>{
  user.setMyInfo(sessionStorage.getItem("user"))
},[user.token])
////////////////////////////////////////////////////////////////////////////////
console.log(user)
useEffect(()=>{
  axios
  .get(`http://localhost:5000/users`,{headers})
.then((result)=>{
  setUsers(result.data)
})
.catch((err)=>{
console.log(err)
})

},[inputValue])

 ///////////////////////////////////////////////////////////////////////////////////// 
const allUsers=users.map((elem,index)=>{
  return(<div onClick={()=>{setInputValue("");setIsSearchBoxShown(false);Navigate(`/profile/${elem._id}`)}}   key={index}>{elem.fullName.includes(inputValue.toLowerCase())?<div className="searchResult"><h4>{elem.fullName}</h4></div>:null}</div>)
})
 //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Box sx={{textAlign:"start"}}>
       <AppBar sx={{ml:{md:`${drawerWidth}px`},width:{md:`calc(100% - ${drawerWidth}px)`}}} position="static">
        <Toolbar>
          <IconButton onClick={()=>{user.setType("temporary");user.setDisplay("block")}}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display:{xs:"block",md:"none"} }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Echoo
          </Typography>
        <Search sx={{mr:"15px"}}>
        <SearchIconWrapper>
<SearchIcon />
</SearchIconWrapper>
<StyledInputBase onChange={(e)=>{console.log(e.target.value)}}
placeholder="Search…"
inputProps={{ 'aria-label': 'search' }}
/>



        </Search >
          <Typography variant="h6" component="div" sx={{mr:"10px"}} >
            {user.myName}
     </Typography>
   
     <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
         
        </Toolbar>
      </AppBar>
      </Box>
    
       
    
      {isSearchBoxShown ? (
        <div  className="searchBox">
          <button onClick={()=>{setInputValue("");setIsSearchBoxShown(false)}}> back</button>
         <div> {inputValue===""?null:allUsers}</div>
        </div>
      ) : null}
    </div>
  );
};
export default Navbar;
