import React, { useEffect } from "react";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { blue } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useTheme } from "@emotion/react";

const drawerWidth = 240;
////////////////////////////////////
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

////////////////////////////////////

const Navbar = () => {
  const theme = useTheme();
  const user = useContext(UserContext);

  const headers = { Authorization: `Bearer ${user.token}` };
  const [users, setUsers] = useState([]);

  const Navigate = useNavigate();
  //////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    user.setMyInfo(sessionStorage.getItem("user"));
  }, [user.token]);
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users`, { headers })
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////renderusers/////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////

  return (
    <Box sx={{ textAlign: "start" }}>
      <AppBar
        sx={{
          position: "fixed",
          top: 0,
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          zIndex: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={() => {
              user.setType("temporary");
              user.setDisplay("block");
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: `${3}vw`, fontWeight: "bold" }}
          >
            Echoo
          </Typography>
          <IconButton
            aria-label="fingerprint"
            color="inherit"
            onClick={() => {
              Navigate(-1);
            }}
          >
            <ArrowBackIosOutlinedIcon />{" "}
          </IconButton>
          <Stack spacing={2} sx={{ width: `${50}%` }}>
            <Autocomplete
              id="free-solo-demo"
              options={users}
              getOptionLabel={(option) => option.fullName}
              filterOptions={(options, { inputValue }) => {
                if (inputValue === "") return [];
                return options.filter((option) =>
                  option.fullName
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                );
              }}
              onChange={(event, value) => {
                if (value) {
                  Navigate(`/profile/${value._id}`);
                }
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ background: theme.palette.search.light }}
                  {...params}
                  placeholder={`search`}
                  InputProps={{
                    ...params.InputProps,

                    endAdornment: null,
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option._id}>
                  {option.fullName}
                </li>
              )}
            />
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", gap: `${1}vw` }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: `${1.6}vw` }}
            >
              {user.myName}
            </Typography>

            <Avatar
              {...stringAvatar(user.myName)}
              style={{
                width: `${3}vw`,
                height: `${3}vw`,
                fontSize: `${1.7}vw`,
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
