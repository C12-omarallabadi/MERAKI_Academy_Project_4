import React from "react"
import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
import Post from "./Post"
import MyPosts from "./MyPosts"
import Comments from "./Comments"
//////////////////////////////////////////////////////////////////////////////////
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
////////////////////////////////////////////////////////
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";

//////////////////////////////////////////////////////////////////////////////////
function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = "#";
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase(),
    };
  }


/////////////////////////////////////////////////////////////////////////////////
const MyAcount =()=>{
    const Navigate=useNavigate()
    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
    const[userInfo,setUserInfo]=useState("")
    const[myPosts,setMyPosts]=useState([])
    const [isTextAreaShown,setIsTextArea]=useState(false)
    const [isMyPostsShown,setIsMyPostsShown]=useState(true)
    /////////////////////////////////////////////////////////////
  

/////////////////////////////////////////////////////////////
useEffect(()=>{                                            
axios
.get(`http://localhost:5000/users/${user.userId}`,{headers})
.then((result)=>{
setUserInfo(result.data)
})
.catch((err)=>{
    Navigate("/")

})
},[])

/////////////////////////////////////////////////////////////






    return (<Box
        sx={{
         height: '100vh',
         overflowY:"auto",
          borderstyle: "solid",
          background: "lightgrey",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          width: { xs: `${100}vw`, md: `calc(100% - 240px)` },
          gap: "20px",
          ml: { xs: 0, md: "240px" },
        }}
      >
        <Box sx={{mt:`${20}vh`,display:"flex",alignItems:"center",gap:`${1}vw`}}>
        <Avatar
                {...stringAvatar(user.myName)}
                style={{
                  width: `${4}vw`,
                  height: `${4}vw`,
                  fontSize: `${2}vw`,
                }}
              />
        <Typography sx={{fontSize:`${4}vw`}}>{user.myName}</Typography>
        </Box>
        <Button variant="contained" onClick={()=>{setIsTextArea(!isTextAreaShown)}}>add a post</Button>
     

        
         {isTextAreaShown?<Post userInfo={userInfo} setIsMyPostsShown={setIsMyPostsShown} setIsTextArea={setIsTextArea}/>:null}
        <MyPosts/>
        </Box>
    )
}
export default  MyAcount