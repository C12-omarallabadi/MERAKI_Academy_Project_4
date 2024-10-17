import "./comment.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./user.css";
import * as React from "react";
import { UserContext } from "../../App";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Divider, TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////
const Comments = ({ postId, isCommentsShown, setCommentsState ,post }) => {
  const Navigate=useNavigate()


    const [inputBar,setInputBar]=useState("")
  const [comments, setComments] = useState([]);

  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
const addComment=()=>{
    axios
    .post(`http://localhost:5000/comments/${postId}`,{comment:inputBar},{ headers })
    .then((result)=>{
setInputBar("")    })
    .catch((err)=>{
     
      Navigate("/")
    })

}
///////////////////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get(` http://localhost:5000/comments/${postId}`, { headers })
      .then((result) => {
        setComments(result.data);
      })
      .catch((err) => {
     
      Navigate("/")
      });
  }, [inputBar]);
 
  const postComments =
    comments.length == 0
      ? false
      : comments.map((elem, index) => {
          return <Box className="comment" key={index}><Typography sx={{fontSize: `${2}vw`}} variant="h6">{elem.commenter.fullName}</Typography><Typography sx={{fontSize: `${2}vw`}}>{elem.comment}</Typography></Box>;
        });
  return (
   <Paper sx={{width:`${50}vw`,position:"fixed",top:`${30}%`,transform:`translate(${-50}%)`}}>
    <Box sx={{background:"red",display:"flex",alignItems:"center",ml:`${2}vw`}}>
    <Avatar    {...stringAvatar(post.author.fullName)} style={{ width: `${4}vw`, height: `${4}vw`, fontSize: `${2}vw`  }} />
    <Typography variant="h6"sx={{fontSize:`${1}vw`}}>{post.author.fullName}</Typography>
    </Box>
    <Box  sx={{background:"GREEN"}}>
      <Typography sx={{padding:`${1}vw`,maxHeight:`${20}vh`,overflowY:"auto",textAlign:"start"}}>{post.post}</Typography>
      <Divider></Divider>
      <Box sx={{background:"yellow"}}>
comments
      </Box>
      <Box>
        
      </Box>
    </Box>
   </Paper>
  );
};
export default Comments;
