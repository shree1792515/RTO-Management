import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { getAdminDashboardData, getAdminStats } from "../../services/adminService";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  const navigate=useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminDashboardData();
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  console.log(stats);
  


  const cardData = [
    { title: "Total Users", value: stats.totalUsers, icon: <PeopleIcon />, color: "#1976d2" , navigate: '/admin/userlist'},
    { title: "Total Vehicles", value: stats.totalVehicleReports, icon: <DirectionsCarIcon />, color: "#388e3c",navigate: '/admin/vehicles' },
    { title: "Total Licenses", value: stats.totalLicense, icon: <CreditCardIcon />, color: "#f57c00",navigate: '/admin/licenses' },
    { title: "Total Appointments", value: stats.totalappointments, icon: <EventNoteIcon />, color: "#d32f2f",navigate: '/admin/appointments' },
    { title: "Total Reports", value: stats.totalReports, icon: <AssessmentIcon />, color: "#7b1fa2",navigate: '/admin/totalreports' },
    // { title: "Total Notifications", value: stats.totalNotifications, icon: <NotificationsActiveIcon />, color: "#0288d1" },
  ];

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ my: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: 2,
                textAlign: "center",
                bgcolor: item.color,
                color: "#fff",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {item.value || 0}
                </Typography>
                <div style={{ fontSize: "50px", margin: "10px 0" }}>{item.icon}</div>
                <Button variant="contained" sx={{ bgcolor: "#fff", color: item.color, mt: 2 }} onClick={()=>navigate(item.navigate)} >
                  View {item.title.split(" ")[1]}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
