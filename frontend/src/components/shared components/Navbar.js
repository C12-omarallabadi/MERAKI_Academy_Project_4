import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "./navBar.css";
const Navbar = () => {
  const [isSearchBoxShown, setIsSearchBoxShown] = useState(false);
  const Navigate = useNavigate();
  const user = useContext(UserContext);

  return (
    <div>
      {user.isLoggedIn ? (
        <div className="navBar">
          <Link className="link" to={"/myAcount"}>
            My Acount
          </Link>
          <input
            onClick={() => {
              setIsSearchBoxShown(!isSearchBoxShown);
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
        <div className="searchBox">
          search box
        </div>
      ) : null}
    </div>
  );
};
export default Navbar;
