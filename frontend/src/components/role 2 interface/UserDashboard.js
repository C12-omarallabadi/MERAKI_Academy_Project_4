import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./user.css";
import * as React from "react";
import { UserContext } from "../../App";
import Comments from "./Comments";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

////////////////////////////////////////////////////////
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { useTheme } from "@emotion/react";

////////////////////////////////////////////////////////////////////////////
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

const UserDashboard = () => {
  ///////////////////////////////////////////////////////////
  const theme=useTheme()

  ////////////////////////////////////////////////////////////
  const [UpdateBoxShown, setUpdateBox] = useState(false);
  const [textOfUpdate, setTextOfUpdate] = useState("");
  const [afterUpdate, setAfterUpdate] = useState("");
  const [isCkeckBoxShown, setIsCheckBox] = useState(false);
  const [postId, setPostId] = useState("");
  const [isCommentsShown, setCommentsState] = useState(false);
  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };
  const Navigate = useNavigate();
  const [post, setPost] = useState({});

  const [posts, setPosts] = useState([]);
  const [reversedPosts, setReversedPosts] = useState([]);
  ////////////////////////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, value, test) => {
    setTextOfUpdate(test);
    setPost(test);
    setPostId(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  /////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", { headers })
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        Navigate("/");
      });
  }, [UpdateBoxShown]);
  ////////////////////////////////////
  useEffect(() => {
    setReversedPosts(posts.reverse());
  }, [posts]);

  ////////////////////////////////////////
  const updatePost = () => {
    axios
      .put(
        `http://localhost:5000/posts/${postId}`,
        { post: afterUpdate },
        { headers }
      )
      .then((result) => {
        setUpdateBox(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////////////////////////////////

  const allPosts = reversedPosts?.map((elem, index) => {
    return (
      <Card 
        key={index}
        sx={{ width: `${50}vw`, minHeight:  `${10}vh`, mb: 5, pr: 3, pl: 3 }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: `${6}vw`,
                gap: `${1.5}vw`,
                ml: `${1.5}vw`,
                mr: `${1.5}vw`,
                mb: `${1}vh`,
              }}
            >
              <Avatar
                {...stringAvatar(elem.author.fullName)}
                style={{
                  width: `${4}vw`,
                  height: `${4}vw`,
                  fontSize: `${2}vw`,
                }}
              />
              <Typography
                sx={{ fontWeight: "bold", fontSize: `${2}vw` }}
                gutterBottom
                variant="h4"
                component="div"
              >
                {elem.author.fullName}
              </Typography>
            </Box>
            {elem.author._id != user.userId ? null : (
              <div>
                <IconButton
                  aria-describedby={id}
                  variant="contained"
                  onClick={(e) => handleClick(e, elem._id, elem.post)}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Popover elevation={1}
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 0 }}>
                    {" "}
                    <Paper>
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            setUpdateBox(true);
                          }}
                        >
                          update
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            {
                              handleClose();
                              setIsCheckBox(true);
                            }
                          }}
                        >
                          delete
                        </MenuItem>
                      </MenuList>
                    </Paper>
                  </Box>
                </Popover>
              </div>
            )}
          </Box>
          <Divider sx={{ mt: `${1}vh`, mb: `${2}vh` }} />
          <Typography
            variant="h4"
            sx={{
              ml: `${1.5}vw`,
              mr: `${1.5}vw`,
              color: "text.secondary",
              textAlign:"start",
              fontSize: `${1.5}vw`,
              maxHeight:`${20}vh`,
              minHeight:`${3}vh`,
              overflowWrap:"break-word",
              wordWrap:"break-word",
              overflowY:"auto"
            }}
          >
            {elem.post}
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Box sx={{ display: "flex" ,justifyContent:"end"}}>
            <Button   sx={{
                color: "text.secondary",
                flexGrow: 1,
                fontSize:`${1}vw`

              }} >like</Button>
            <Button
              onClick={() => {
                setPost(elem);
                setPostId(elem._id);
                setCommentsState(true);
              }}
              variant="plain"
              sx={{
                color: "text.secondary",
                flexGrow: 1,
                fontSize:`${1}vw`
              }}
            >
              comment
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  });
  return (
    <Box
      sx={{
        height: '100vh',
        overflowY:"auto",
        borderstyle: "solid",
        background: theme.palette.omar.light,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        width: { xs: `${100}vw`, md: `calc(100% - 240px)` },
        gap: "20px",
        ml: { xs: 0, md: "240px" },
      }}
    >
      <div className="TEST">
        {allPosts}
        {isCkeckBoxShown ? (
          <Box
          sx={{width:`${50}vw`,position:"fixed",top:`${30}%`}}
          >
            <Paper elevation={24}>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: 40,
                  alignItems: "center",
                  fontSize: `${1.5}vw`,
              
                }}
              >
                are you realy want to delete this post?
              </Typography>
              <Typography sx={ {  maxHeight:`${20}vh`,
    overflowWrap:"break-word",
    wordWrap:"break-word",
    textAlign:"start",
    padding:`${1}vw`,
    overflowY:"auto",maxHeight: `${20}vh`
                 }}>{post}</Typography>

              <Box
                sx={{
                  height: 40,
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {" "}
                <Button
                  onClick={() => {
                    axios
                      .delete(`http://localhost:5000/posts/${postId}`, {
                        headers,
                      })
                      .then((result) => {
                        const newPosts = reversedPosts.filter(
                          (elem) => elem._id != postId
                        );
                        setReversedPosts(newPosts);
                        setIsCheckBox(false);
                      })
                      .catch((err) => {
                        Navigate("/");
                      });
                  }}
                >
                  yes
                </Button>
                <Button
                  onClick={() => {
                    setIsCheckBox(false);
                  }}
                >
                  no
                </Button>
              </Box>
            </Paper>
          </Box>
        ) : null}
      </div>
      {isCommentsShown ? (
        <div>
          <Comments
            post={post}
            postId={postId}
            isCommentsShown={isCommentsShown}
            setCommentsState={setCommentsState}
          />
        </div>
      ) : null}
      {UpdateBoxShown?<Paper elevation={24} sx={{width:`${50}vw`,position:"fixed",top:`${30}%`}}>
        <Box sx={{display:"flex",alignItems:"center",gap:`${.7}vw`,height:`${10}vh`,pl:`${.7}vw`}}>
      <Avatar
                {...stringAvatar(user.myName)}
                style={{
                  width: `${3}vw`,
                  height: `${3}vw`,
                  fontSize: `${2}vw`,
                }}
              />
        <Typography>{user.myName}</Typography></Box>
           
<TextField  
      multiline
      rows={4}
      variant="outlined"
      fullWidth onChange={(e)=>{setAfterUpdate(e.target.value)}} defaultValue={textOfUpdate}></TextField>
<Box>
<Button onClick={()=>{setUpdateBox(false)}}>back</Button>
<Button sx onClick={updatePost}>update now</Button></Box>
      </Paper>:null}
    </Box>
  );
};
export default UserDashboard;
