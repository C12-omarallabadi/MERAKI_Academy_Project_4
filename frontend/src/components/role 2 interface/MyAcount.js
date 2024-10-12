import React from "react"
import axios from "axios"
import { useContext,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
import Post from "./Post"
import MyPosts from "./MyPosts"


const MyAcount =()=>{
    const Navigate=useNavigate()
    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
    const[userInfo,setUserInfo]=useState("")
    const[myPosts,setMyPosts]=useState([])
    const [isTextAreaShown,setIsTextArea]=useState(false)
    const [isMyPostsShown,setIsMyPostsShown]=useState(false)


/////////////////////////////////////////////////////////////
useEffect(()=>{                                            
axios
.get(`http://localhost:5000/users/${user.userId}`,{headers})
.then((result)=>{
setUserInfo(result.data)
})
.catch((err)=>{
    Navigate("/")

})
},[])

/////////////////////////////////////////////////////////////






    return (<div>
        <h1>{userInfo.fullName}</h1>
        <button onClick={()=>{setIsTextArea(!isTextAreaShown);setIsMyPostsShown(false)}}>add a post</button>
        <button onClick={()=>{setIsMyPostsShown(!isMyPostsShown);setIsTextArea(false)}}>My Posts</button>

        
         {isTextAreaShown?<Post userInfo={userInfo}/>:null}
         {isMyPostsShown?<MyPosts/>:null}
        </div>
    )
}
export default  MyAcount