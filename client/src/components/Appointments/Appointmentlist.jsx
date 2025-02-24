import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import moment from "moment";
import { CheckCircle, Cancel, Schedule } from "@mui/icons-material";
import { getAppointments } from "../../services/appointmentService";

const statusOptions = ["Scheduled", "Completed", "Cancelled"];

const statusIcons = {
  Scheduled: <Schedule color="primary" />,
  Completed: <CheckCircle color="success" />,
  Cancelled: <Cancel color="error" />,
};

const statusColors = {
  Scheduled: "primary",
  Completed: "success",
  Cancelled: "error",
};

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    setUpdating(appointmentId);

    try {
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, { status: newStatus });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: newStatus } : appt
        )
      );

      setSnackbar({ open: true, message: "Status updated successfully!", severity: "success" });
    } catch (error) {
      console.error("Error updating status:", error);
      setSnackbar({ open: true, message: "Failed to update status!", severity: "error" });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <Card sx={{ boxShadow: 5, borderRadius: 3, p: 2, mt: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          📅 Appointments List
        </Typography>

        {loading ? (
          <CircularProgress sx={{ display: "block", mx: "auto" }} />
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976D2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Service Type</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Appointment Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment, index) => (
                  <TableRow
                    key={appointment._id}
                    sx={{ backgroundColor: index % 2 === 0 ? "#F9F9F9" : "#FFFFFF" }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{appointment.serviceType}</TableCell>
                    <TableCell>
                      {moment(appointment.appointmentDate).format("DD MMM YYYY, hh:mm A")}
                    </TableCell>
                    <TableCell>
                      {updating === appointment._id ? (
                        <CircularProgress size={20} />
                      ) : (
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={appointment.status}
                            label="Status"
                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                            sx={{
                              backgroundColor: "white",
                              color: statusColors[appointment.status],
                              fontWeight: "bold",
                            }}
                          >
                            {statusOptions.map((status) => (
                              <MenuItem key={status} value={status}>
                                {statusIcons[status]} {status}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Card>
  );
};

export default AppointmentsList;
