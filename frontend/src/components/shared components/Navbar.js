import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
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
    return(user.token?<div className="navBar"><Link to={"/myAcount"}>My Acount</Link> <Link onClick={()=>{Navigate(-1)}}>BACK</Link><Link to={"/"} onClick={goToLogOut}>logout</Link></div>:null)
}
export default Navbar