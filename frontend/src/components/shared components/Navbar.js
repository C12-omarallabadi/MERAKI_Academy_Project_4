import React, { useEffect } from "react";
import { useContext, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";

import "./navBar.css";

const Navbar = () => {
  const user = useContext(UserContext);

  const headers = { Authorization: `Bearer ${user.token}` };
  const[users,setUsers]=useState([])
  
  const [isSearchBoxShown, setIsSearchBoxShown] = useState(false);
const [inputValue,setInputValue]=useState("")
  const Navigate = useNavigate();
//////////////////////////////////////////////////////////////////////////////////////
useEffect(()=>{
  axios
  .get(`http://localhost:5000/users`,{headers})
.then((result)=>{
  setUsers(result.data)
})
.catch((err)=>{
console.log(err)
})

},[inputValue])

 ///////////////////////////////////////////////////////////////////////////////////// 
const allUsers=users.map((elem,index)=>{
  return(<div key={index}>{elem.fullName.includes(inputValue)?<h4>{elem.fullName}</h4>:null}</div>)
})

 //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {user.isLoggedIn ? (
        <div className="navBar">
          <Link className="link" to={"/myAcount"}>
            My Acount
          </Link>
          <input
          value={inputValue}
          onChange={(e)=>{setInputValue(e.target.value)}}
            onClick={() => {
              setIsSearchBoxShown(true);
            }}
            className="search"
            placeholder="     search"
          ></input>{" "}
          <Link
            className="link"
            onClick={() => {
              Navigate(-1);
            }}
          >
            BACK
          </Link>
          <Link className="link" to={"/"}>
            logout
          </Link>
        </div>
      ) : null}
      {isSearchBoxShown ? (
        <div  className="searchBox">
          <button onClick={()=>{setInputValue("");setIsSearchBoxShown(false)}}> back</button>
         <div> {inputValue===""?null:allUsers}</div>
        </div>
      ) : null}
    </div>
  );
};
export default Navbar;
