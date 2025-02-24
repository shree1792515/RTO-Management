import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { getTestuserById } from "../services/testService";


const TestDetails = () => {

  const user = JSON.parse(localStorage.getItem('user'))?.user;

  const testDatas = {
    applicantId: "65f4a3b6c9d8a7e6b5c4d3f2",
    vehicleId: "75f4a3b6c9d8a7e6b5c4d3f2",
    applicantName: "John Doe",
    vehicle: "Toyota Camry",
    testDate: "2025-02-23",
    result: "Pass",
    remarks: "Excellent performance."
  };

  const [testData,settestData]=useState(testDatas)





 useEffect(()=>{

    const fetchLicenses=async()=>{
      const data= await  getTestuserById(user.id)
      console.log(data[0]);
      
      settestData(data[0]);
  
    }

    fetchLicenses()

  },[])



  const getStatusColor = (status) => {
    switch (status) {
      case "Pass":
        return "success";
      case "Fail":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f4f4">
      <Card sx={{ minWidth: 350, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Test Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Applicant ID:</strong> {testData.applicantId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Vehicle ID:</strong> {testData.vehicleId}
          </Typography>
         
          <Typography variant="body1" gutterBottom>
            <strong>Test Date:</strong> {testData.testDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Result:</strong> <Chip label={testData.result} color={getStatusColor(testData.result)} />
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Remarks:</strong> {testData.remarks}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestDetails;
