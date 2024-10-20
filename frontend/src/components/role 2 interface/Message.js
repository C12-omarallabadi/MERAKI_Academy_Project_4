import React from "react"
import { useState,useEffect } from "react"
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from "@emotion/react";
import { Divider, TextField } from "@mui/material";


import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
const Message=({socket,user_id,isChatShown,showHideChat})=>{
    const theme=useTheme()
    const[txt,setTxt]=useState("")

    const[to,setTo]=useState("")
    const[message,setMessage]=useState("")
    const[allMessages,setAllMessages]=useState([])


useEffect(()=>{
    socket.on("message",recived_message)

    return()=>{
        socket.off("message",recived_message)

    }
},[allMessages])



const sendMessage=()=>{
    socket.emit("message",{to,from:user_id,message})
}
const recived_message=(data)=>{
    console.log(data)
    setAllMessages([...allMessages,data])
}
    return(<Paper elevation={24} sx={{ borderColor:"#1976d2", borderStyle:"solid",position:"fixed",top: `${15}vh`,left: `${35}vw`,fontWeight:"bold" ,width: `${40}vw`,zIndex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}} >
        <Box sx={{display:"flex"}}>
    <Button color="black" onClick={()=>{showHideChat("none")}}>x</Button>
    </Box>
    <Box>
        <Typography sx={{fontWeight:"bold"}}>Select User</Typography>
    <TextField type="text" placeholder="username" onChange={(e)=>{setTo(e.target.value)}}></TextField>
    </Box>
   
   <Box sx={{minHeight: `${50}vh`,maxHeight:`${50}vh`,overflowY:"auto"
             }}>
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}} >
   { allMessages.length>0&&allMessages.map((message,index)=>{
    return(
        <Box sx={{padding:`${1}vh`}}>
        <p key={index}>
        <small>
            
            <Paper sx={{display:"inline-block",background:"#1976d2"}}>
            from {message.from}:
            </Paper>
            <Paper elevation={2} sx={{ borderStyle:"solid",borderColor:"#1976d2", background:theme.palette.omar.light,padding:`${.5}vw`,textAlign:"start",maxHeight:`${20}vh`,overflowWrap:"break-word",wordBreak:"break-word",overflowY:"auto",width:`${30}vw`}}>
            {message.message}
            </Paper>
        </small>
        </p>
        </Box>
    )
   })
   
   }
   </Box>
   </Box>
       
       
       <Box sx={{display:"flex",alignItems:"center"}}>
    <TextField sx={{flexGrow:1}} type="text" placeholder="message" value={txt} onChange={(e)=>{setTxt((e.target.value));setMessage(e.target.value)}}></TextField>
     <Button onClick={()=>{setTxt("");sendMessage()}}>send</Button>
     </Box>

    </Paper>)
}
export default Message