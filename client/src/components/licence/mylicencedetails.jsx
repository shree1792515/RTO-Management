import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { getAllLicencesuserId } from "../../services/licenseService";

const LicenseDetails = () => {

    const user = JSON.parse(localStorage.getItem('user'))?.user;
  // Dummy License Data
  const licenses = {
    licenseNumber: "1234567890",
    holderName: "John Doe",
    userId: "USR12345",
    licenseType: "Driving License",
    dateOfBirth: "1995-08-12",
    issueDate: "2023-02-15",
    expiryDate: "2033-02-15",
    documents: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Dummy PDF URL
    status: "Pending", // Change to "Active" or "Expired" for testing
    createdAt: new Date().toLocaleDateString(),
  };

  const [license,setLicense]=useState(licenses)

      

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Pending":
        return "warning";
      case "Expired":
        return "error";
      default:
        return "default";
    }
  };


  useEffect(()=>{

    const fetchLicenses=async()=>{
      const data= await  getAllLicencesuserId(user.id)
      setLicense(data[0]) 
    }

    fetchLicenses()

  },[])




  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card
        sx={{
          maxWidth: 450,
          p: 4,
          boxShadow: 10,
          borderRadius: 5,
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom textAlign="center">
            License Details
          </Typography>

          <Box display="flex" flexDirection="column" gap={1.5} mt={2}>
            <Typography variant="body1"><strong>License No:</strong> {license.licenseNumber}</Typography>
            <Typography variant="body1"><strong>Holder Name:</strong> {license.holderName}</Typography>
            <Typography variant="body1"><strong>License Type:</strong> {license.licenseType}</Typography>
            <Typography variant="body1"><strong>Date of Birth:</strong> {license.dateOfBirth}</Typography>
            <Typography variant="body1"><strong>Issue Date:</strong> {license.issueDate}</Typography>
            <Typography variant="body1"><strong>Expiry Date:</strong> {license.expiryDate}</Typography>
            <Typography variant="body1"><strong>Created At:</strong> {license.createdAt}</Typography>
          </Box>

          {/* Status with color */}
          <Box mt={3} display="flex" justifyContent="center">
            <Chip label={license.status} color={getStatusColor(license.status)} variant="filled" sx={{ fontSize: "1rem", p: 1 }} />
          </Box>

          {/* PDF Document View & Download */}
          <Box mt={3} display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="error"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => window.open("http://localhost:5000/"+license.documents, "_blank")}
            >
              View PDF
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              href={"http://localhost:5000/"+license.documents}
              download
            >
              Download PDF
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LicenseDetails;
