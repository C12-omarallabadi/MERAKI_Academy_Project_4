import { useState,useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./user.css";
import * as React from 'react';
import { UserContext } from "../../App";




const UserDashboard=()=>{
  const Navigate=useNavigate()
  const user=useContext(UserContext)
    
const [posts,setPosts]=useState([])
useEffect(()=>{
axios
.get("http://localhost:5000/posts")
.then((result)=>{
setPosts(result.data)
})
.catch((err)=>{
console.log(err)
})
},[])
const allPosts=posts.map((elem,index)=>{
    return(
        <div className="post" key={index}>
        <h4 > {elem.author.firstName} {elem.author.lastName}</h4>
       <p  >{elem.post}</p>
       </div>
    )
})
    return(
<div className="postSection">{user.token?allPosts:Navigate("/")} </div>
    )
}
export default UserDashboard