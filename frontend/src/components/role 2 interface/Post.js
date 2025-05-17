import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "./addPost.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Divider, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase(),
  };
}

const Post = ({ userInfo, setIsMyPostsShown, setIsTextArea }) => {
  /////////////////////////////////////////
  const [postArea, setPostArea] = useState("");
  const Navigate = useNavigate();
  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };
  //////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  const createNewPost = () => {
    axios
      .post("https://meraki-academy-project-4-fl11.onrender.com/posts", { post: postArea }, { headers })
      .then((result) => {
        console.log("done");
        setIsTextArea(false);
        Navigate("/userDashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////////////////////////////////////////////////////////////////
  return (
    <Paper
      elevation={24}
      sx={{ width: `${50}vw`, position: "fixed", top: `${30}%`, zIndex: 1 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: `${1}vw` }}>
        <Avatar
          {...stringAvatar(user.myName)}
          style={{ width: `${2}vw`, height: `${2}vw`, fontSize: `${1.2}vw` }}
        />

        <Typography sx={{ fontSize: `${1.3}vw` }}>
          {userInfo.fullName}
        </Typography>
      </Box>
      <TextField
        rows={4}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setPostArea(e.target.value);
        }}
        placeholder="What is on your mind ?"
      ></TextField>
      <Divider></Divider>
      <Button onClick={createNewPost}>Create</Button>
    </Paper>
  );
};
export default Post;
