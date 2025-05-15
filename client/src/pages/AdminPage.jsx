import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminDashboard from '../components/Admin/AdminDashboard';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex', }}>
            {/* Sidebar */}
           
            <Drawer
                anchor="left"
                open={sidebarOpen}
                onClose={toggleSidebar}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#2c3e58',
                        color: 'white',
                        width: 240,
                    },
                }}
            >
                <List>
                    <ListItem button onClick={() => navigate('/admin')}>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/admin/reports')}>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/admin/userlist')}>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/admin/register')}>
                        <ListItemText primary="Create Admin" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
               
                <IconButton
                    onClick={toggleSidebar}
                    sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300, color: '#f5fafa' }}
                >
                    <MenuIcon />
                </IconButton>

                <Container fluid>
                    <Row className="mt-4">
                        <Col>
                            <AdminDashboard />
                        </Col>
                    </Row>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminPage;
