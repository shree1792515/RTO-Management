import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const RTONavbar = () => {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))?.user;



    const services = () => {

        if (user?.role === "Officer") {
            navigate("/officer")
        } else if (user?.role === "Administrator") {
            navigate("/admin")
        } else {
            navigate("/citizen")
        }



    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2c3e50', width: '100%' }}>
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    RTO Management System
                </Typography>
                <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                <Button color="inherit" onClick={services}>Services</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact</Button>
            </Toolbar>
        </AppBar>
    );
};

export default RTONavbar;
