import React from "react"
import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
const MyAcount =()=>{
    const Navigate=useNavigate()
    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
/////////////////////////////////////////////////////////////
useEffect(()=>{                                            
axios
.get(`http://localhost:5000/users/${user.userId}`)
.then()
.catch()
},[])

/////////////////////////////////////////////////////////////






    return (
        <h1>my account</h1>
    )
}
export default  MyAcount