import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import AdminDashboard from "./components/role 1 interface/AdminDashboard";
import UserDashboard from "./components/role 2 interface/UserDashboard";
import Navbar from "./components/shared components/Navbar";
import MyAcount from "./components/role 2 interface/MyAcount";
import WebsiteUser from "./components/role 2 interface/WebsiteUser";
import DrawerM from "./components/shared components/Drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Sockett } from "./components/role 2 interface/Sockett";
export const UserContext = createContext();

const App = () => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
      omar: {
        light: mode === "dark" ? "#616161" : "rgb(240, 240, 240)",
        dark: mode === "dark" ? "rgb(240, 240, 240)" : "#616161",
      },
      search: {
        light: mode === "dark" ? "#616161" : "white",
        dark: mode === "dark" ? "white" : "#616161",
      },
    },
  });
  const [Type, setType] = useState("permanent");
  const [Display, setDisplay] = useState("none");

  const [myName, setMyName] = useState(sessionStorage.getItem("myName") || "");

  const [myInfo, setMyInfo] = useState(sessionStorage.getItem("user") || "");
  const [file, setFile] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") || false
  );
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || "");
  const Navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <UserContext.Provider
          value={{
            token,
            setToken,
            userId,
            setUserId,
            isLoggedIn,
            setIsLoggedIn,
            file,
            setFile,
            myInfo,
            setMyInfo,
            myName,
            setMyName,
            Type,
            setType,
            Display,
            setDisplay,
            mode,
            setMode,
          }}
        >
          {isLoggedIn ? <DrawerM /> : null}
          {isLoggedIn ? <Navbar /> : null}

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/socket" element={<Sockett />} />

            <Route path="/myAcount" element={<MyAcount />} />

            <Route path="/register" element={<Register />} />
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/profile/:id" element={<WebsiteUser />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
