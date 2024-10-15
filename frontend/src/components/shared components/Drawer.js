import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
const drawerWidth = 240;

const DrawerM=()=>{
    const Navigate=useNavigate()

    ///////////////////////////////////////////////////////////////////

    return(
        <>
        
          <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <h1>test</h1>
       <Divider/>
       <ListItem disablePadding>
                <ListItemButton onClick={()=>{Navigate("/")}}>
                  <ListItemIcon>
                  <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText color='inhert' primary={"Logout"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{Navigate("/myAcount")}}>
                  <ListItemIcon>
                  <PersonOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText color='inhert' primary={"My Acount"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{Navigate(-1)}}>
                  <ListItemIcon>
                  <InboxIcon />
                  </ListItemIcon >
                  <ListItemText color='inhert' primary={"back"} />
                </ListItemButton>
              </ListItem>

        
      </Drawer>
        </>
    )
}
export default DrawerM