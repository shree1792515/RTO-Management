import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const RTONavbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2c3e50',width:'100%' }}>
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    RTO Management System
                </Typography>
                <Button color="inherit">Home</Button>
                <Button color="inherit">Services</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact</Button>
            </Toolbar>
        </AppBar>
    );
};

export default RTONavbar;
