import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";



const WebsiteUser=()=>{
    const Navigate = useNavigate();
    const user = useContext(UserContext);
    const headers = { Authorization: `Bearer ${user.token}` };
    const [selectedUser,setSelectedUser]=useState("")
    const { id } = useParams();

    ////////////////////////////////////////////////////////////
    useEffect(()=>{
        
        axios
        .get(`http://localhost:5000/users/${id}`,{headers})
        .then((result)=>{
        setSelectedUser(result.data)
        })
        .catch((err)=>{
            console.log(err)
            Navigate("/")
        
        })
        },[id])





    return(<div>
        <h1>{selectedUser.fullName}</h1>
       
       
        </div>
    )

}
export default WebsiteUser