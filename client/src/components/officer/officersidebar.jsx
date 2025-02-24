import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import {
    Grid, Card, CardContent, Typography, Button, Snackbar,
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import VehicleRegistrationForm from "../vehicle/vehicleregisterationform";
import AppointmentScheduler from "../bookappointment";
import LicenseApplication from "../licence/applylicence";
import TestApplication from "../testapplication";


const defaultServices = [

    { id: 2, title: "Vehicle Registration", description: "Register your new vehicle hassle-free.", icon: <AssignmentIcon /> ,  component: <><VehicleRegistrationForm/></>}, 
    { id: 6, title: "Apply Appointment", description: "Schedule an appointment for any other driving-related services.", icon: <PersonIcon />,  component: <><AppointmentScheduler/></>  },
    { id: 7, title: "Apply License", description: "Schedule an appointment for any other driving-related services.", icon: <PersonIcon /> , component: <><LicenseApplication/></>},//TestApplication
    { id: 8, title: "Apply Test", description: "Schedule an appointment for any other driving-related services.", icon: <PersonIcon />,component: <><TestApplication/></> },
    
];

const OfficePageoptions = () => {
    let user = JSON.parse(localStorage.getItem("user"))?.user;
    const [services, setServices] = useState(defaultServices);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar Drawer */}
            <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 265, boxSizing: "border-box", backgroundColor: '#2c3e50', color: "white" } }}>
                <Typography variant="h5" textAlign="center" fontWeight="bold" sx={{ my: 2 }}>Citizen Portal</Typography>
                <Divider />
                <List>
                    {defaultServices.map((service) => (
                        <ListItem button key={service.id} onClick={() => setSelectedService(service === "Dashboard" ? null : service)}>
                            <ListItemIcon sx={{ color: "white" }}>{service.icon}</ListItemIcon>
                            <ListItemText primary={service.title} />

                        </ListItem>
                    ))}

                    <ListItem button onClick={() => setSelectedService(null)}>
                        <ListItemIcon sx={{ color: "white" }}> <AssignmentIcon /> </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Container sx={{ flexGrow: 1, marginLeft: "260px" }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ my: 4 }}>
                    Welcome, {user?.username || "Citizen"}
                </Typography>

                {loading ? (
                    <div className="d-flex justify-content-center my-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">{error}</Alert>
                ) : selectedService ? (
                    <>
                        <Card sx={{
                            boxShadow: 5,
                            borderRadius: 3,
                            textAlign: "center",
                            transition: "0.3s",
                            background: "linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)",
                            color: "white",
                            padding: "20px"
                        }}>
                            <CardContent>
                                {selectedService.icon}
                                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>{selectedService.title}</Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>{selectedService.description}</Typography>
                            </CardContent>


                        </Card>
                        {
                         
                         selectedService.component

                        }
                    </>

                ) : (
                    <Grid container spacing={3} justifyContent="center">
                        
                    </Grid>
                )}

                {/* Snackbar for error messages */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    message={error}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
            </Container>
        </div>
    );
};

export default OfficePageoptions;
