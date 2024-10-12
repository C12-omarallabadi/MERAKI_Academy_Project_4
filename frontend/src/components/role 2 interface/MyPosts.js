import React from "react"
import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import "./myPosts.css";

import { Link } from "react-router-dom"

const MyPosts =()=>{
    const [myPosts,setMyPosts]=useState([])
    const Navigate=useNavigate()
    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
    //////////////////////////////////////////////////////////////
    useEffect(()=>{
        axios
        .get(" http://localhost:5000/posts/myPosts",{headers})
        .then((result)=>{
setMyPosts(result.data)        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    //////////////////////////////////////////////////////////////
    const showMyPosts=myPosts.map((elem,index)=>{
        return(<div className="myPostContainer" key={index}><div className="myPost" >
            <h4>{elem.author.fullName}</h4>
            <div className="postContent"><p>{elem.post}</p></div>
        </div>
        <button>delete</button>
        <button>comment</button>
        <button>update</button>


        </div>)
    })
    //////////////////////////////////////////////////////////////
 
    return (<div className="allPostsContainer">
    {showMyPosts}
    </div>
      
    )
}
export default MyPosts