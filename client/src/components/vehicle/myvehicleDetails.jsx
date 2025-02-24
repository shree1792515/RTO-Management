import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Chip, Grid, CardMedia } from "@mui/material";
import { fetchVehicleRegistrationsspecificuser } from "../../services/vehicleService";


// Function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "registered":
      return "success";
    case "renewed":
      return "primary";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};









const VehicleDetails = () => {



    const user = JSON.parse(localStorage.getItem('user'))?.user;

    
// Dummy Vehicle Data
const vehicles = {
    userId: "USR12345",
    engineChassisNumber: "ENG123456789",
    ownerName: "John Doe",
    vehicleType: "Car",
    model: "Model S",
    brand: "Tesla",
    yearOfManufacture: 2022,
    vregistrationNumber: "TSLA-2024",
    color: "Red",
    registrationDate: "2024-02-15",
    status: "registered", // Try "renewed", "pending"
    vehicleImage: "https://via.placeholder.com/400", // Replace with actual vehicle image URL
  };


  const [vehicle,setvehicle]=useState(vehicles)


    useEffect(()=>{

      async  function  fetchVehicles() {
    
          const data= await fetchVehicleRegistrationsspecificuser(user.id)

          setvehicle(data.vehicles[0]);


            
        }

        fetchVehicles()
    
    },[])



  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Card sx={{ maxWidth: 450, p: 3, boxShadow: 5, borderRadius: 3, bgcolor: "white" }}>
        <CardMedia component="img" height="200" image={"http://localhost:5000/"+vehicle.vehicleImage} alt="Vehicle Image" />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
            Vehicle Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}><Typography><strong>Application:</strong> {vehicle._id}</Typography></Grid>
            <Grid item xs={12}><Typography><strong>Owner:</strong> {vehicle.ownerName}</Typography></Grid>
            <Grid item xs={6}><Typography><strong>Type:</strong> {vehicle.vehicleType}</Typography></Grid>
            <Grid item xs={6}><Typography><strong>Brand:</strong> {vehicle.brand}</Typography></Grid>
            <Grid item xs={6}><Typography><strong>Model:</strong> {vehicle.model}</Typography></Grid>
            <Grid item xs={6}><Typography><strong>Year:</strong> {vehicle.yearOfManufacture}</Typography></Grid>
            <Grid item xs={12}><Typography><strong>Color:</strong> {vehicle.color}</Typography></Grid>
            <Grid item xs={12}><Typography><strong>Registration No:</strong> {vehicle.vregistrationNumber}</Typography></Grid>
            <Grid item xs={12}><Typography><strong>Reg Date:</strong> {vehicle.registrationDate}</Typography></Grid>
          </Grid>

          {/* Status with Color */}
          <Box mt={2} display="flex" justifyContent="center">
            <Chip label={vehicle.status.toUpperCase()} color={getStatusColor(vehicle.status)} variant="filled" sx={{ fontWeight: "bold", fontSize: "14px" }} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VehicleDetails;
