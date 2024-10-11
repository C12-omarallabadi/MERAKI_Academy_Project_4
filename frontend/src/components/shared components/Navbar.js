import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import "./navBar.css";
const Navbar=()=>{
    const Navigate=useNavigate()
    const user=useContext(UserContext)
    const goToLogOut=()=>{
      localStorage.removeItem("token") 
      user.setToken("")
      localStorage.removeItem("userId") 
      user.setUserId("")
      Navigate("/")

    }
    return(user.token?<div className="navBar"><button onClick={goToLogOut}>logout</button><br></br></div>:null)
}
export default Navbar