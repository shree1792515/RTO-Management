import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AdminDashboard from '../components/Admin/AdminDashboard';
import { getAdminDashboardData } from '../services/adminService';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  
   
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate=useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const nagateUserlist=()=>{
        navigate('/admin/userlist');
    }
    const nagateadminRegister=()=>{
        navigate('/admin/register');
    }
  

    




    return (
        <Container >
            <br />
            <IconButton onMouseEnter={toggleSidebar}style={{ position: 'absolute', top: 10, left: 10 }}>
                <br /> <br /> <br /> <br />
                <MenuIcon  />
                
            </IconButton>
            
            <Drawer anchor="left" open={sidebarOpen} 
             sx={{ '& .MuiDrawer-paper': { backgroundColor: '#2c3e50', color: 'white' } }}
             onClose={toggleSidebar}>
                <List>j
                    <ListItem button>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Users" onClick={nagateUserlist} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="create admin" onClick={nagateadminRegister} />
                    </ListItem>
                  
                </List>
            </Drawer>

            <Row>
                <Col>
                    <AdminDashboard />
                </Col>
            </Row>
        
        </Container>
    );
};

export default AdminPage;
