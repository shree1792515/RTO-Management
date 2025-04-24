import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DescriptionIcon from "@mui/icons-material/Description";
import { getAllLicencesuserId } from "../../services/licenseService";
import axios from "axios";

const LicenseDetails = () => {
  const user = JSON.parse(localStorage.getItem('user'))?.user;
  const [license, setLicense] = useState();

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

  const fetchLicenses = async () => {
    const data = await getAllLicencesuserId(user.id);
    setLicense(data[0]);
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  // 🔁 Renew License Handler
  const handleRenew = async () => {
    const today = new Date();
    const next10Years = new Date(today.setFullYear(today.getFullYear() + 10));

    try {
      await axios.put("http://localhost:5000/api/licenses/renew/licence", {
        licenseNumber: license.licenseNumber,
        newExpiryDate: next10Years.toISOString().split("T")[0], // Format: yyyy-mm-dd
      });

      alert("License renewed successfully!");
      fetchLicenses(); // Refresh updated data
    } catch (error) {
      console.error("Error renewing license:", error);
    }
  };

  // 📥 Generate E-License PDF Handler
  const handleGenerateELicense = () => {
    window.open(`http://localhost:5000/api/licenses/generate-e-license/${license.licenseNumber}`, "_blank");
  };

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
            <Typography variant="body1"><strong>License No:</strong> {license?.licenseNumber}</Typography>
            <Typography variant="body1"><strong>Holder Name:</strong> {license?.holderName}</Typography>
            <Typography variant="body1"><strong>License Type:</strong> {license?.licenseType}</Typography>
            <Typography variant="body1"><strong>Date of Birth:</strong> {license?.dateOfBirth}</Typography>
            <Typography variant="body1"><strong>Issue Date:</strong> {license?.issueDate}</Typography>
            <Typography variant="body1"><strong>Expiry Date:</strong> {license?.expiryDate}</Typography>
            <Typography variant="body1"><strong>Created At:</strong> {new Date(license?.createdAt).toLocaleDateString()}</Typography>
          </Box>

          {/* Status */}
          <Box mt={3} display="flex" justifyContent="center">
            <Chip
              label={license?.status}
              color={getStatusColor(license?.status)}
              variant="filled"
              sx={{ fontSize: "1rem", p: 1 }}
            />
          </Box>

          {/* Buttons */}
          <Box mt={3} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              color="error"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => window.open("http://localhost:5000/" + license?.documents, "_blank")}
            >
              View PDF
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              href={"http://localhost:5000/" + license?.documents}
              download
            >
              Download PDF
            </Button>
          </Box>

          {/* Renew Button (if license is expired based on expiry date) */}
          {license?.expiryDate && new Date(license.expiryDate) < new Date() && (
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                color="warning"
                startIcon={<AutorenewIcon />}
                onClick={handleRenew}
              >
                Renew License
              </Button>
            </Box>
          )}

          {/* Generate E-License Button (only if Active or Renewed) */}
          {(license?.status === "completed" || license?.status === "Renewed") && (
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                color="success"
                startIcon={<DescriptionIcon />}
                onClick={handleGenerateELicense}
              >
                Generate E-License
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LicenseDetails;
