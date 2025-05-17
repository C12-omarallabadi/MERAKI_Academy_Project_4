import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./myPosts.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MyPostsComments from "./MyPostsComments";
////////////////////////////////////////////////////////////////////////////////////////
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Divider, TextField } from "@mui/material";
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
import { useTheme } from "@emotion/react";
import MenuList from "@mui/material/MenuList";
function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
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
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase(),
    };
  }

const WebsiteUser=()=>{
    const theme=useTheme()
    const Navigate = useNavigate();
    const user = useContext(UserContext);
    const headers = { Authorization: `Bearer ${user.token}` };
    const [selectedUser,setSelectedUser]=useState("")
    const[posts,setPosts]=useState([])
    const { id } = useParams();

    ////////////////////////////////////////////////////////////
    useEffect(()=>{
        
        axios
        .get(`hhttps://meraki-academy-project-4-fl11.onrender.com/users/${id}`,{headers})
        .then((result)=>{
        setSelectedUser(result.data)
        })
        .catch((err)=>{
            console.log(err)
            Navigate("/")
        
        })
        },[id])
/////////////////////////////////////////////////////////////////////
useEffect(()=>{
        
    axios
    .get(`https://meraki-academy-project-4-fl11.onrender.com/posts/user/${id}`,{headers})
    .then((result)=>{
    setPosts(result.data)
    })
    .catch((err)=>{
        console.log(err)
    
    })
    },[id])


///////////////////////////////////////////////////////////////////////
const showPosts = posts.map((elem, index) => {
    return (
        <Card 
        key={index}
        sx={{ width: `${50}vw`, minHeight:  `${10}vh`, mb: 5, pr: 3, pl: 3 ,}}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: `${6}vw`,
                gap: `${1.5}vw`,
                ml: `${1.5}vw`,
                mr: `${1.5}vw`,
                mb: `${1}vh`,
              }}
            >
             {selectedUser&& <Avatar  
                {...stringAvatar(selectedUser.fullName)}
                style={{
                  width: `${4}vw`,
                  height: `${4}vw`,
                  fontSize: `${2}vw`,
                }}
              />}
              <Typography
                sx={{ fontWeight: "bold", fontSize: `${2}vw` }}
                gutterBottom
                variant="h4"
                component="div"
              >
                {elem.author.fullName}
              </Typography>
            </Box>
           
           
          </Box>
          <Divider sx={{ mt: `${1}vh`, mb: `${2}vh` }} />
          <Typography
            variant="h4"
            sx={{
              ml: `${1.5}vw`,
              mr: `${1.5}vw`,
              color: "text.secondary",
              textAlign:"start",
              fontSize: `${2}vw`,
              maxHeight:`${20}vh`,
              minHeight:`${3}vh`,
              overflowWrap:"break-word",
              wordWrap:"break-word",
              overflowY:"auto"
            }}
          >
            {elem.post}
          </Typography>

          <Box>
            <Divider></Divider>
          <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"end"}}>
         <Typography sx={{ fontSize: `${1.2}vw`,}}> {Array.isArray(elem.react) ? elem.react.length : 0} likes</Typography>

         <Typography sx={{ fontSize: `${1.2}vw`,}}> {Array.isArray(elem.comments) ? elem.comments.length : 0} comments</Typography>
          </Box>
          </Box>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Box sx={{ display: "flex" ,justifyContent:"end"}}>
            <Button   sx={{
                color: "text.secondary",
                flexGrow: 1,
                fontSize:`${1}vw`

              }} >like</Button>
            <Button
              
              variant="plain"
              sx={{
                color: "text.secondary",
                flexGrow: 1,
                fontSize:`${1}vw`
              }}
            >
              comment
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  });

/////////////////////////////////////////////////////////////////////




    return(<Box
        sx={{
        
         overflowY:"auto",
          borderstyle: "solid",
          background: theme.palette.omar.light,
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
       {selectedUser&& <Avatar
                {...stringAvatar(selectedUser.fullName)}
                style={{
                  width: `${4}vw`,
                  height: `${4}vw`,
                  fontSize: `${2}vw`,
                }}
              />}
        <Typography sx={{fontSize:`${4}vw`}}>{selectedUser.fullName}</Typography>
        </Box>
       

       {showPosts}
        </Box>
    )

}
export default WebsiteUser