import React from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../App"
import { Link } from "react-router-dom"
const MyAcount =()=>{
    const Navigate=useNavigate()
    const user=useContext(useContext)
    return (
        <h1>my account</h1>
    )
}
export default  MyAcount