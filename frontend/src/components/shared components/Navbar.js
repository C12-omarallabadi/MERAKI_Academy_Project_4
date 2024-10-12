import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
import "./navBar.css";
const Navbar=()=>{
    const Navigate=useNavigate()
    const user=useContext(UserContext)
   
    return(user.isLoggedIn?<div className="navBar"><Link to={"/myAcount"}>My Acount</Link> <Link onClick={()=>{Navigate(-1)}}>BACK</Link><Link to={"/"} >logout</Link></div>:null)
}
export default Navbar