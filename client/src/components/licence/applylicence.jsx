import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, Typography, Card, CardContent } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { applyForLicense } from '../../services/licenseService';


const LicenseApplication = () => {

    let user = JSON.parse(localStorage.getItem("user"))?.user;
    const [citizenId, setCitizenId] = useState(user.id);
    const [holderName, setholderName] = useState(user.username);
    const [licenseType, setLicenseType] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [issueDate, setIssueDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [message, setMessage] = useState('');
   

    const handleFileUpload = (event) => {
        setDocuments(event.target.files[0]);
    };

    const handleIssueDateChange = (newDate) => {
        if (newDate) {
            const formattedDate = dayjs(newDate);
            setIssueDate(formattedDate);
            setExpiryDate(formattedDate.add(5, 'year')); // Set expiry as a dayjs object
        }
    };


    function is18OrOlder(dob) {
        const birthDate = new Date(dob); 
        const today = new Date(); 
    
        // Calculate the age
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
    
        // Adjust age if the birthdate has not occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
    
        return age >= 18;
    }
    
    
    

    const handleSubmit = async () => {

        const formattedDate = dateOfBirth ? dateOfBirth.format('YYYY-MM-DD') : null;
        const formattedDate1 = issueDate ? issueDate.format('YYYY-MM-DD') : null;
        const formattedDate2 = expiryDate ? expiryDate.format('YYYY-MM-DD') : null;
        
        console.log(formattedDate2, formattedDate1, formattedDate);

        if(is18OrOlder(formattedDate)){

            try {
                const formData = new FormData();
                formData.append('userId', citizenId);
                formData.append('licenseType', licenseType);
                formData.append('holderName', holderName);
                formData.append('dateOfBirth', formattedDate);
                formData.append('issueDate', formattedDate1);
                formData.append('expiryDate', formattedDate2);
                formData.append('documents', documents);
    
                const response = await applyForLicense(formData)
                setMessage(response.message);
            } catch (error) {
                setMessage('Error applying for license');
            }
        }else{
            setMessage("You must be 18 or older to proceed.")
        }



    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card sx={{ p: 3, boxShadow: 4, borderRadius: 4 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        License Application Form
                    </Typography>
                    <TextField
                        fullWidth
                        label="Citizen ID"
                        variant="outlined"
                        value={citizenId}
                        aria-readonly
                      
                        sx={{ mb: 2 }}
                    />


                    <TextField
                        fullWidth
                        label="holderName"
                        variant="outlined"
                        value={holderName}
                       
                        sx={{ mb: 2 }}
                    />


                    <TextField
                        select
                        fullWidth
                        label="License Type"
                        variant="outlined"
                        value={licenseType}
                        onChange={(e) => setLicenseType(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Two-Wheeler">Two-Wheeler</MenuItem>
                        <MenuItem value="Four-Wheeler">Four-Wheeler</MenuItem>
                        <MenuItem value="Heavy Vehicle">Heavy Vehicle</MenuItem>
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of Birth"
                            value={dateOfBirth}
                            onChange={(newDate) => setDateOfBirth(dayjs(newDate))}
                            renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
                        />
                        <DatePicker
                            label="Issue Date"
                            value={issueDate}
                            onChange={handleIssueDateChange}
                            renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
                        />
                        <DatePicker
                            label="Expiry Date"
                            value={expiryDate}
                            disabled
                            renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
                        />
                    </LocalizationProvider>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ py: 1.5, fontSize: 18, mb: 2 }}
                    >
                        Upload Documents
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    <Button variant="contained" fullWidth sx={{ py: 1.5, fontSize: 18 }} onClick={handleSubmit}>
                        Apply for License
                    </Button>
                    {message && <Typography color="green" mt={2}>{message}</Typography>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default LicenseApplication;
