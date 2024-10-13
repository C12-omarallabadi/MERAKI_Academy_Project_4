import React from "react"
import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
import "./addPost.css";

const Post =({userInfo,setIsMyPostsShown,setIsTextArea})=>{
    
   /////////////////////////////////////////
    const[postArea,setPostArea]=useState("")
    const Navigate=useNavigate()
    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
    

 ///////////////////////////////////////////////////////////////
 const createNewPost=()=>{
    axios.
    post("http://localhost:5000/posts",{post:postArea},{headers})
    .then((result)=>{
        console.log("done")
        setIsTextArea(false)
        setIsMyPostsShown(true)
    })
    .catch((err)=>{
        console.log(err)
    })
}
 ////////////////////////////////////////////////////////////////
    return (<div  className="addPost"><div>
        <h4>{userInfo.fullName}</h4>
<textarea onChange={(e)=>{setPostArea(e.target.value)}} className="textArea" placeholder="What is on your mind ?"></textarea>
        </div>
        <button onClick={createNewPost}>Create</button>
        </div>
    )
}
export default Post