import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, Typography, Card, CardContent } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import axios from 'axios';
import { createAppointment } from '../services/appointmentService';

const AppointmentScheduler = () => {
    const user = JSON.parse(localStorage.getItem('user'))?.user;
    const [citizenId, setCitizenId] = useState(user.id);
    const [serviceType, setServiceType] = useState('');
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [message, setMessage] = useState('');
    

    const handleSubmit = async () => {
        const formattedDate = appointmentDate ? appointmentDate.format('YYYY-MM-DD') : null;
        console.log({
            userId: citizenId,
            serviceType,
            formattedDate
        });
        

        try {
           

        const response=  await  createAppointment({
                userId: citizenId,
                serviceType,
                appointmentDate:formattedDate
            })

            console.log(response);
            

            setMessage(response.message);
        } catch (error) {
            setMessage('Error scheduling appointment');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card sx={{ p: 3, boxShadow: 4, borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Schedule an Appointment
                    </Typography>
                    <TextField
                        fullWidth
                        label="Citizen ID"
                        variant="outlined"
                        value={citizenId}
                       
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Service Type"
                        variant="outlined"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Vehicle Inspection">Vehicle Inspection</MenuItem>
                        <MenuItem value="License Test">License Test</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Appointment Date"
                            value={appointmentDate}
                            onChange={(newDate) => setAppointmentDate(dayjs(newDate))}
                            renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 3 }} />}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" fullWidth sx={{ py: 1.5, fontSize: 18 }} onClick={handleSubmit}>
                        Schedule Appointment
                    </Button>
                    {message && <Typography color="green" mt={2}>{message}</Typography>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default AppointmentScheduler;
