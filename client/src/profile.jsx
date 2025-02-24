import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Button } from "@mui/material";
import { Email, Person, VerifiedUser } from "@mui/icons-material";

let  dummyUser = {
  email: "dummy@example.com",
  id: "123456789abcdef",
  role: "Guest",
  username: "DummyUser",
};

dummyUser= JSON.parse(localStorage.getItem('user'))?.user;

const ProfileCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      }}
    >
      <Card
        sx={{
          width: 450,
          height:400,
          padding: 3,
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: 6,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
         

        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: "auto",
            bgcolor: "#ff9800",
            fontSize: 24,
          }}
        >
          {dummyUser.username.charAt(0).toUpperCase()}
        </Avatar>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {dummyUser.username}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
            <VerifiedUser sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
            {dummyUser.role}
          </Typography>
          <Typography variant="body1" mt={1}>
            <Person sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
            ID: {dummyUser.id}
          </Typography>
          <Typography variant="body1" mt={1}>
            <Email sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
            {dummyUser.email}
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              background: "#ff9800",
              color: "white",
              fontWeight: "bold",
              '&:hover': { background: "#e68900" },
            }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileCard;
