import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import { motion } from 'framer-motion';
import TrafficolorAwarenessPage from './Awarness';

const MotionCard = motion(Card);

const features = [
    {
        icon: <DirectionsCarIcon fontSize="large" color="primary" />,
        title: 'Vehicle Registration',
        description: 'Register new vehicles quickly and securely through the system.',
    },
    {
        icon: <AssignmentIcon fontSize="large" color="primary" />,
        title: 'License Management',
        description: 'Apply, renew, or check the status of your driver’s license.',
    },
    {
        icon: <EmojiTransportationIcon fontSize="large" color="primary" />,
        title: 'Transport Permits',
        description: 'Manage all types of vehicle permits for interstate travel.',
    },
];

const videos = [
    {
        id: 1,
        title: 'RTO Services Overview',
        url: 'https://www.youtube.com/embed/Rv5SrUD3UAw',
    },
    {
        id: 2,
        title: 'How to Apply for a Driving License',
        url: 'https://www.youtube.com/embed/J-HcbmyBgPQ',
    },
    {
        id: 3,
        title: 'Vehicle Registration Process Explained',
        url: 'https://www.youtube.com/embed/vVUE-FQ1Jbc',
    },
    {
        id: 4,
        title: 'How to Renew License Online',
        url: 'https://www.youtube.com/embed/_4w3FfZIAtw',
    },
    {
        id: 6,
        title: 'Check Your Driving License Status',
        url: 'https://www.youtube.com/embed/QPhZbbhtte4',
    },
    {
        id: 7,
        title: 'Apply for a Transport Permit',
        url: 'https://www.youtube.com/embed/RqutD6T6K58',
    },
    {
        id: 8,
        title: 'Check Vehicle Registration Status',
        url: 'https://www.youtube.com/embed/RMCihduivLA',
    },
];

const HomePage = () => {
    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box textAlign="center" sx={{ mb: 6 }}>
                    <Typography variant="h2" gutterBottom color="primary">RTO Management System</Typography>
                    <Typography variant="h6" color="textSecondary">
                        Your one-stop platform for all transportation and licensing services.
                    </Typography>
                    <Box mt={4}>
                        <Button component={Link} to="/login" variant="contained" size="large" sx={{ mr: 2 }}>
                            Login
                        </Button>
                        <Button component={Link} to="/signup" variant="outlined" size="large">
                            Sign Up
                        </Button>
                    </Box>
                </Box>

                {/* Features Section */}
                <Grid container spacing={4}>
                    {features.map((feature, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Card sx={{ textAlign: 'center', p: 3, boxShadow: 4, borderRadius: 3 }}>
                                    {feature.icon}
                                    <CardContent>
                                        <Typography variant="h6">{feature.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* YouTube Videos Section */}
                <Box mt={10}>
                    <Typography variant="h4" gutterBottom textAlign="center" color="primary">
                        Learn More About RTO Services
                    </Typography>
                    <Grid container spacing={4}>
                        {videos.map((video, index) => (
                            <Grid item xs={12} sm={6} md={4} key={video.id}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    style={{ 
                                        display: 'flex',
                                         justifyContent: 'center' ,
                                            alignItems: 'center',
                                        height: '100%',
                                        padding: '10px',
                                        backgroundColor: '#lightgray',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.68)',
                                        marginBottom: '20px',
                                     

                                    }}
                                >
                                    <Card sx={{ boxShadow: 5, borderRadius: 2 }}>
                                        <iframe
                                            width="100%"
                                            height="200"
                                            src={video.url}
                                            title={video.title}
                                            frameBorder="0"
                                            allowFullScreen
                                            style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                                        />
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {video.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Extended RTO Content */}
                <Box mt={10}>
                    <Typography variant="h4" gutterBottom>Why Use Our Platform?</Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Our RTO Management System simplifies every part of the vehicle and license registration process.
                        Whether you're a new driver, vehicle owner, or transport business, our platform brings everything to your fingertips:
                        digital documentation, status tracking, appointment booking, and more.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Avoid the long queues and manual paperwork — use our smart digital solution to apply for driving licenses, 
                        vehicle ownership transfers, fitness certificates, and transport permits. Our secure and transparent platform 
                        ensures everything is handled safely, with live status updates and notifications.
                    </Typography>
                </Box>


                {/* traffic  */}

                <TrafficolorAwarenessPage />

                {/* Call to Action */}
                <Box mt={10} textAlign="center">
                    <Typography variant="h5" gutterBottom>Ready to manage your RTO needs efficiently?</Typography>
                    <Button component={Link} to="/signup" variant="contained" size="large" color="primary">
                        Get Started
                    </Button>
                </Box>



            </Container>
        </Box>
    );
};

export default HomePage;
