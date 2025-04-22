import React from 'react'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Paper, Typography, useTheme, Badge } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import { Menu, MenuItem, Sidebar, sidebarClasses } from 'react-pro-sidebar';
import { useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';



const SideNav = ({ collapsed, headerHeight = 100 }) => {

  const theme = useTheme();
  const [newOrders, setNewOrders] = useState(0);
  useWebSocket((message) => {
    console.log("New Order Notification: ", message);
    setNewOrders(prev => prev + 1); // Increase badge count
  });


  return (
    <Paper
      elevation={3}
      backgroundColor={theme.palette.info.dark}
      sx={{
        height: `calc(100vh - ${headerHeight}px)`, // Sidebar height accounts for header height
        width: 'auto',
        display: 'flex',
        position: 'sticky', // Makes it sticky
        top: `${headerHeight}px`, // Adjust the top position to align below the header
      }}
    >
      <Sidebar collapsed={collapsed}>

        <Menu>
          <MenuItem active icon={<DashboardIcon />} component={<Link to="/adminPortal" />}>
            <Typography variant='h6'>Dashboard</Typography>
          </MenuItem>
          <MenuItem
            icon={
              <Badge
                color="error"
                badgeContent={newOrders}
                invisible={newOrders === 0}
                overlap="circular"
              >
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={() => setNewOrders(0)} // 👈 Hide badge when clicked
            component={<Link to="/adminPortal/orders" />}
          >
            <Typography variant='h6'>Orders</Typography>
          </MenuItem>
          <MenuItem active icon={<PermIdentityOutlinedIcon />} component={<Link to="/adminPortal/users" />}>
            <Typography variant='h6'>Users</Typography>
          </MenuItem>
          <MenuItem active icon={<DiscountOutlinedIcon />} component={<Link to="/adminPortal/coupons" />}>
            <Typography variant='h6'>Coupons</Typography>
          </MenuItem>
          <MenuItem active icon={<Inventory2OutlinedIcon />} component={<Link to="/adminPortal/products" />}>
            <Typography variant='h6'>Products</Typography>
          </MenuItem>
          {/* <MenuItem active icon={<ChatBubbleIcon />} component={<Link to="/adminPortal/chat" />}>
            <Typography variant='h6'>Products</Typography>
          </MenuItem> */}
        </Menu>
      </Sidebar>

    </Paper>
  )
}

export default SideNav
