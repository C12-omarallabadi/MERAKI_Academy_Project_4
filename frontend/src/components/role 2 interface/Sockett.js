import socketInit from "../socket.server";
import { useEffect,useState } from "react";
import { useContext } from "react";
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Divider, TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

import Paper from '@mui/material/Paper';
import { UserContext } from "../../App";
import React from "react";
import Message from "./Message";
export const Sockett=({argeeBox,showHideAB,showHideChat ,isChatShown})=>{
    const user=useContext(UserContext)
    const[user_id,setUserId]=useState("")
    const[joined,setJoined]=useState(false)


    const[token,setToken]=useState("")
    const[socket,setSocket]=useState(null)
useEffect(()=>{
    setToken(user.token)
    setUserId(user.myName)
},[])




    useEffect(()=>{
        
        socket?.on("connect",()=>{
            console.log(true)
        })
        socket?.on("connect_error",(error)=>{
            console.log(error.message)
        })
        return()=>{
            socket?.close()
            socket?.removeAllListeners()
        }
    },[socket]) 
    console.log(argeeBox)

    return(
        <>
        {argeeBox&&!joined?
      <Box>
            <Paper sx={{position:"fixed",top: `${20}vh`,left: `${20}vw`,fontWeight:"bold" ,borderStyle:"solid",width: `${70}vw`,zIndex:2}}>
                <Box sx={{display:"flex",justifyContent:"end"}}>
                <IconButton aria-label="delete" onClick={()=>{showHideAB(false)}}>
  <ClearIcon />
</IconButton>
                </Box>
                <Box sx={{padding: `${1}vw`}}>
                    <Typography sx={{fontWeight:"bold",fontSize:`${2}vw`}}>
                    Welcome to Echoo Chat Chat!
                    </Typography>
                </Box>
            <Box sx={{textAlign:"start",padding: `${1}vw`}}>
            Before you begin, we would like to remind you of some basic rules to ensure a positive experience for everyone:
            </Box>
            <Box sx={{textAlign:"start",padding: `${1}vw`}}>
                1-Respect Others: Please treat everyone with courtesy and respect. Disrespectful comments or aggressive behavior are not acceptable.
<br></br>
2-Privacy Matters: Do not share your personal information or anyone else's.
<br></br>
3-Stay on Topic: Please try to stay focused on the subject at hand.

            </Box>
            <Box sx={{textAlign:"start",padding: `${1}vw`}} >
            By entering the chat, you agree to these guidelines. Thank you for your cooperation, and we hope you have an enjoyable experience!

            </Box>
            <Box sx={{fontSize:`${1.5}vw`,fontWeight:"bold"}}>
            Start the conversation!
            </Box>
        <Box>
            <Button variant="contained" onClick={()=>{
              showHideChat("block");showHideAB(false); setJoined(true) ;setSocket(socketInit({user_id,token}))
            }}>i agree</Button>
            </Box>
            </Paper>
            </Box>:null}
            <Box sx={{display:`${isChatShown}`}}>
           {socket? <Message isChatShown={isChatShown}showHideChat={showHideChat} socket={socket}user_id={user_id}/>:null}
           </Box>
           </>
           
       
    )

}
