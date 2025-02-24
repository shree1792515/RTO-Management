import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { registerVehicle } from "../../services/vehicleService";

const FormContainer = styled(Paper)({
  maxWidth: 500,
  padding: 30,
  borderRadius: 12,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
});

const SubmitButton = styled(Button)({
  marginTop: 20,
  padding: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "8px",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const VehicleRegistrationForm = () => {
  const user = JSON.parse(localStorage.getItem('user'))?.user;

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      registrationNumber: "",
      ownerName: "",
      vehicleType: "",
      model: "",
      brand: "",
      yearOfManufacture: "",
      color: "",
      status: "pending",
      vehicleImage: null,
    },
  });

  const onSubmit = async (data) => {
    console.log("Vehicle Data:", data);
    const response = await registerVehicle({ ...data, userId: user.id });
    console.log(response);

    alert("Vehicle Registered Successfully!");
    reset(); // Reset form after submission
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <FormContainer elevation={3}>
        <Typography variant="h4" fontWeight="bold" color="primary" align="center" gutterBottom>
          Vehicle Registration
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="registrationNumber"
            control={control}
            render={({ field }) => <TextField {...field} label="Engine Chassis Number" fullWidth margin="normal" required />}
          />
          <Controller
            name="ownerName"
            control={control}
            render={({ field }) => <TextField {...field} label="Owner Name" fullWidth margin="normal" required />}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Vehicle Type</InputLabel>
            <Controller
              name="vehicleType"
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue="">
                  <MenuItem value="petrol">Petrol</MenuItem>
                  <MenuItem value="diesel">Diesel</MenuItem>
                  <MenuItem value="electric">Electric</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            name="model"
            control={control}
            render={({ field }) => <TextField {...field} label="Model" fullWidth margin="normal" required />}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => <TextField {...field} label="Brand" fullWidth margin="normal" required />}
          />
          <Controller
            name="yearOfManufacture"
            control={control}
            render={({ field }) => <TextField {...field} label="Year of Manufacture" type="number" fullWidth margin="normal" required />}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => <TextField {...field} label="Color" fullWidth margin="normal" required />}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} defaultValue="pending">
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            name="vehicleImage"
            control={control}
            render={({ field }) => (
              <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={(e) => field.onChange(e.target.files[0])}
              />
            )}
          />
          <SubmitButton variant="contained" color="primary" fullWidth type="submit">
            Register Vehicle
          </SubmitButton>
        </form>
      </FormContainer>
    </Box>
  );
};

export default VehicleRegistrationForm;
