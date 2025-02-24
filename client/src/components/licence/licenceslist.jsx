import React, { useEffect, useState } from "react";
import { getAllLicences, updateLicensestatus } from "../../services/licenseService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import moment from "moment";
import { Button } from "react-bootstrap";

// Status options with colors
const statusOptions = [
  { value: "Pending", label: "Pending", color: "#4CAF50" }, // Green
  { value: "Rejected", label: "Rejected", color: "#F44336" }, // Red
  { value: "suspended", label: "Suspended", color: "#FF9800" }, // Orange
];

const LicenseList = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const data = await getAllLicences();
        setLicenses(data);
      } catch (error) {
        console.error("Error fetching licenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  // Handle status change
  const handleStatusChange = async (licenseId, newStatus) => {
    try {
      console.log(licenseId,newStatus);

     const data= await updateLicensestatus(licenseId,newStatus)

    
    //  window.location.reload();
      
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        🪪 License List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>License Number</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Holder Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>DOB</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Issue Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Expiry Date</TableCell>
              
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Documents</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {licenses.map((license, index) => {
                return (
                  <TableRow key={license._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{license.licenseNumber}</TableCell>
                    <TableCell>{license.holderName}</TableCell>
                    <TableCell>{moment(license.dateOfBirth).format("DD MMM YYYY")}</TableCell>
                    <TableCell>{moment(license.issueDate).format("DD MMM YYYY")}</TableCell>
                    <TableCell>{moment(license.expiryDate).format("DD MMM YYYY")}</TableCell>
                    
                    <TableCell><a href={"http://localhost:5000/"+license.documents} target="_blank">
                    <Button>
                      Download
                    </Button>
                    </a></TableCell>
                    <TableCell>
                      <Select
                        value={license.status} 
                        onChange={(e) => handleStatusChange(license._id, e.target.value)}
                        sx={(theme) => {
                          const currentStatus = statusOptions.find((s) => s.value === license.status);
                          return {
                            minWidth: 140,
                            backgroundColor: currentStatus ? currentStatus.color : "#f0f0f0",
                            color: "white",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            paddingX: 1,
                            "& .MuiSelect-icon": { color: "white" },
                          };
                        }}
                      >
                        {statusOptions.map((status) => (
                          <MenuItem
                            key={status.value}
                            value={status.value}
                            sx={{
                              backgroundColor: status.color,
                              color: "black",
                              fontWeight: "bold",
                              "&:hover": {
                                backgroundColor: "#ddd",
                                color: "#000",
                              },
                            }}
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LicenseList;
