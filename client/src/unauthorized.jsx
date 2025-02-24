// Unauthorized.js
import { Link } from "react-router-dom";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Unauthorized = () => {
  return (
    <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card sx={{ maxWidth: 400, textAlign: "center", p: 3, boxShadow: 6, borderRadius: 3, background: "#ffebee" }}>
        <CardContent>
          <LockOutlinedIcon sx={{ fontSize: 60, color: "#d32f2f" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, color: "#d32f2f" }}>
            Unauthorized Access
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "#616161" }}>
            You do not have permission to view this page.
          </Typography>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            sx={{ mt: 3, backgroundColor: "#d32f2f", '&:hover': { backgroundColor: "#b71c1c" } }}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Unauthorized;
