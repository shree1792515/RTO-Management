import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, Typography, Card, CardContent } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { createTest } from '../services/testService';


const TestApplication = () => {
    const [applicantId, setApplicantId] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [testDate, setTestDate] = useState(null);
    const [result, setResult] = useState('Pending');
    const [remarks, setRemarks] = useState('');
    const [message, setMessage] = useState('');

    const user = JSON.parse(localStorage.getItem('user'))?.user;
   const userId=user.id

    const handleSubmit = async () => {
        try {

           
            
       
            const formattedDate = testDate ? testDate.format('YYYY-MM-DD') : null;
            const formData = { applicantId, vehicleId, testDate:formattedDate, result, remarks,userId };
            // const response = await axios.post('/api/tests', formData);

            const response = await  createTest(formData)
           

            setMessage(response.message);
        } catch (error) {
            console.log(error);
            
            setMessage('Error applying for test');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card sx={{ p: 3, boxShadow: 4, borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Test Application Form
                    </Typography>
                    <TextField
                        fullWidth
                        label="Applicant ID"
                        variant="outlined"
                        value={applicantId}
                        onChange={(e) => setApplicantId(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Vehicle ID"
                        variant="outlined"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Test Date"
                            value={testDate}
                            onChange={(newDate) => setTestDate(dayjs(newDate))}
                            renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        select
                        fullWidth
                        label="Result"
                        variant="outlined"
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                       
                        <MenuItem value="Pending">Pending</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        label="Remarks"
                        variant="outlined"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        sx={{ mb: 2 }}
                        multiline
                        rows={3}
                    />
                    <Button variant="contained" fullWidth sx={{ py: 1.5, fontSize: 18 }} onClick={handleSubmit}>
                        Apply for Test
                    </Button>
                    {message && <Typography color="green" mt={2}>{message}</Typography>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default TestApplication;
