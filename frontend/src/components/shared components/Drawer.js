import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ToggleButton from '@mui/material/ToggleButton';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';


import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Sockett } from '../role 2 interface/Sockett';
import { UserContext } from '../../App';


const drawerWidth = 240;


const DrawerM=()=>{
  const[isChatShown,showHideChat]=useState("none")

  const [argeeBox,showHideAB]=React.useState(false)

  const user=useContext(UserContext)

    const Navigate=useNavigate()
    const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

    ///////////////////////////////////////////////////////////////////

    return(
        <>
        
          <Drawer
        variant={user.Type}
        open={true}
        onClose={()=>{user.setDisplay("none");user.setType("permanent")}}
        sx={{
          display:{xs:user.Display,md:"block"},
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <ToggleButtonGroup 
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton onClick={()=>{user.setMode("light")}} sx={{flexGrow:1}} value="web">light</ToggleButton>
      <ToggleButton onClick={()=>{user.setMode("dark")}} sx={{flexGrow:1}} value="android">dark</ToggleButton>
     
    </ToggleButtonGroup>
       <Divider/>
      
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{Navigate("/myAcount")}}>
                  <ListItemIcon>
                  <PersonOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText color='inhert' primary={"My Acount"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{Navigate("/userDashboard")}}>
                  <ListItemIcon>
                  <HomeIcon />
                  </ListItemIcon>
                  <ListItemText color='inhert' primary={"Home"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                  <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText color='inhert' primary={"Settings"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton  onClick={()=>{showHideAB(true);showHideChat("block")}} >
                  <ListItemIcon>
                  <ChatIcon />
                  </ListItemIcon>
                  <ListItemText color='inhert' primary={"Chat"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{Navigate("/")}}>
                  <ListItemIcon>
                  <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText color='inhert' primary={"Logout"} />
                </ListItemButton>
              </ListItem>
             

        
      </Drawer>
      <Sockett showHideChat={showHideChat}isChatShown={isChatShown} argeeBox={argeeBox} showHideAB={showHideAB}/>
        </>
    )
}
export default DrawerM