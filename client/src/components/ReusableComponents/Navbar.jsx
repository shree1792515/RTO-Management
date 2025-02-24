import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const RTONavbar = () => {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))?.user;

    const logout=()=>{
        localStorage.removeItem("user")
        navigate("/login")
    }



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
                {
                    user ? <>
                        <Button color="inherit" onClick={()=>navigate("/profile")} >Profile</Button>
                        <Button color="inherit" onClick={logout} >Logout</Button>
                    </> : <>
                        <Button variant="primary" size="lg">Login</Button>
                        <Button variant="secondary" size="lg">Sign Up</Button>
                    </>
                }


            </Toolbar>
        </AppBar>
    );
};

export default RTONavbar;
