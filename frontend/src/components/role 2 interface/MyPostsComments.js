import React,{useEffect,useContext,useState} from "react"
import "./myPostsComments.css";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
//////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////
const MyPostsComments=({isMyPostsCommentsShown,setIsMyPostsCommentsShown,myPostId,setMyPostId})=>{
  const theme=useTheme()
    const[myPostCommentss,setMyPostCommentss]=useState([])
    const[myPost,setMyPost]=useState('')
    const[commentInput,setCommentInput]=useState('')
    const [myName,setMyName]=useState("")


    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
    const Navigate=useNavigate()
///////////////////////////////////////////////////////////////////
useEffect(()=>{
    axios
    .get(` http://localhost:5000/comments/${myPostId}`, { headers })
    .then((result) => {
      setMyPostCommentss(result.data);
    })
    .catch((err) => {
   
    Navigate("/")
    });
},[commentInput])

///////////////////////////////////////////////////////////////////
const postComments =
myPostCommentss.length == 0
  ? false
  : myPostCommentss.map((elem, index) => {
      return <Paper elevation={3}  key={index} sx={{background:theme.palette.omar.light,width:`${40}vw`,mb:`${2.5}vh`,mt:`${2.5}vh`}}><Box sx={{pl: `${1}vw`,height: `${8}vh`,display:"flex",gap:`${.7}vw`,alignItems:"end"}}>
      <Avatar    {...stringAvatar(elem.commenter.fullName)} style={{ width: `${3}vw`, height: `${3}vw`, fontSize: `${2}vw`,padding: `${1}vw`  }} />
      <Typography sx={{fontSize: `${2}vw`}} variant="h6">{elem.commenter.fullName}</Typography></Box><Box sx={{  maxHeight:`${20}vh`,
    overflowWrap:"break-word",
    wordWrap:"break-word",
    textAlign:"start",
    padding:`${1}vw`,
    overflowY:"auto",maxHeight: `${20}vh`}}><Typography sx={{fontSize: `${2}vw`}}>{elem.comment}</Typography></Box></Paper>;
    });

///////////////////////////////////////////////////////////////////
useEffect(()=>{
    axios
    .get(`http://localhost:5000/posts/${myPostId}`,{headers})
    .then((result)=>{
        setMyName(result.data.author.fullName )

        setMyPost(result.data)

    })
    .catch((err)=>{
     
      Navigate("/")})
},[])





/////////////////////////////////////////////////////////////////////////////////////////////////////
const addComment=()=>{
    axios
    .post(`http://localhost:5000/comments/${myPostId}`,{comment:commentInput},{ headers })
    .then((result)=>{
setCommentInput("")    })
    .catch((err)=>{
     
      Navigate("/")
    })

}
//////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////


    return( <Paper elevation={24} sx={{width:`${50}vw`,position:"fixed",top:`${17}%`}}>
      <Box sx={{display:"flex",alignItems:"end",ml:`${2}vw`,gap:`${.7}vw`,height: `${8}vh`}}>
      <Avatar    {...stringAvatar(user.myName)} style={{ width: `${3}vw`, height: `${3}vw`, fontSize: `${2}vw`  }} />
      <Typography variant="h6"sx={{fontSize:`${2}vw`}}>{user.myName}</Typography>
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
                overflowY:"auto"}}>{myPost.post}</Typography>
        </Box>
  
        <Divider></Divider>
      
        <Box sx={{height:`${4}vh`,display:"flex",alignItems:"center",justifyContent:"space-between",pr:`${20}vw`}}>
  <Button onClick={()=>{setIsMyPostsCommentsShown(false)}} sx={{fontSize:`${1.5}vw`}}>Back</Button><Typography sx={{fontSize:`${2}vw`}}>comments</Typography>
        </Box><Divider></Divider>
        <Box sx={{maxHeight:`${15}vw`,overflowY:"auto",display:"flex",flexDirection:"column",alignItems:"center",minHeight:`${30}vh`}}>
          {postComments?postComments:<Typography sx={{mt:`${4}vh`}}>Be The First Commenter</Typography>}
        </Box>
        <Box sx={{display:"flex",alignItems:"stretch"}} >
        <TextField sx={{flexGrow:1}}  value={commentInput} onChange={(e)=>{setCommentInput(e.target.value)}}  placeholder="add comment" />
        <Button  onClick={addComment} className="addCommentButton">add comment</Button>
        </Box>
     </Paper>)
}
export default MyPostsComments