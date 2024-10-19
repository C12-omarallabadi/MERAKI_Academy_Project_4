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
import { useTheme } from "@emotion/react";
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
  const theme=useTheme()
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
          return <Paper elevation={3}  key={index} sx={{background:theme.palette.omar.light,width:`${40}vw`,mb:`${2.5}vh`,mt:`${2.5}vh`}}><Box sx={{pl: `${1}vw`,height: `${8}vh`,display:"flex",gap:`${.7}vw`,alignItems:"end"}}>
            <Avatar    {...stringAvatar(elem.commenter.fullName)} style={{ width: `${3}vw`, height: `${3}vw`, fontSize: `${2}vw`,padding: `${1}vw`  }} />
            <Typography sx={{fontSize: `${2}vw`}} variant="h6">{elem.commenter.fullName}</Typography></Box><Box sx={{  maxHeight:`${20}vh`,
          overflowWrap:"break-word",
          wordWrap:"break-word",
          textAlign:"start",
          padding:`${1}vw`,
          overflowY:"auto",maxHeight: `${20}vh`}}><Typography sx={{fontSize: `${2}vw`}}>{elem.comment}</Typography></Box></Paper>;
        });
       
  return (
   <Paper elevation={24} sx={{width:`${50}vw`,position:"fixed",top:`${17}%`,transform:`translate(${-50}%)`}}>
    <Box sx={{display:"flex",alignItems:"end",ml:`${2}vw`,gap:`${.7}vw`,height: `${8}vh`}}>
    <Avatar    {...stringAvatar(post.author.fullName)} style={{ width: `${3}vw`, height: `${3}vw`, fontSize: `${2}vw`  }} />
    <Typography variant="h6"sx={{fontSize:`${2}vw`}}>{post.author.fullName}</Typography>
    </Box>
    <Box  >
      <Typography sx={{ 
      textAlign:"start",
            padding:`${1.5}vw`,
              color: "text.secondary",
              fontSize: `${2}vw`,
              maxHeight:`${17}vh`,

              overflowWrap:"break-word",
              wordWrap:"break-word",
              overflowY:"auto"}}>{post.post}</Typography>
      </Box>

      <Divider></Divider>
    
      <Box sx={{height:`${4}vh`,display:"flex",alignItems:"center",justifyContent:"space-between",pr:`${20}vw`}}>
<Button onClick={()=>{setCommentsState(false)}} sx={{fontSize:`${1.5}vw`}}>Back</Button><Typography sx={{fontSize:`${2}vw`}}>comments</Typography>
      </Box><Divider></Divider>
      <Box sx={{maxHeight:`${15}vw`,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",minHeight:`${30}vh`}}>
        {postComments?postComments:<Typography sx={{mt:`${4}vh`}}>Be The First Commenter</Typography>}
      </Box>
      <Box sx={{display:"flex",alignItems:"stretch"}} >
      <TextField sx={{flexGrow:1}}  value={inputBar} onChange={(e)=>{setInputBar(e.target.value)}}  placeholder="add comment" />
      <Button  onClick={addComment} className="addCommentButton">add comment</Button>
      </Box>
   </Paper>
  );
};
export default Comments;
