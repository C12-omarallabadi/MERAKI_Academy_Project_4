import React from "react"
import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"

const MyPosts =()=>{
    const Navigate=useNavigate()
    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
 
    return (<div>
        <h1>MY posts</h1>
    </div>
      
    )
}
export default MyPosts