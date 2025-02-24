import axios from 'axios';

const API_URL = 'http://localhost:5000/api/search'; // Adjust the URL as needed

// Function to search for vehicle registration details
export const searchVehicle = async (registrationNumber) => {
    try {
        const response = await axios.get(`${API_URL}/vehicle/${registrationNumber}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching vehicle details: ' + error.message);
    }
};

// Function to search for license records
export const searchLicense = async (licenseNumber) => {
    try {
        const response = await axios.get(`${API_URL}/license/${licenseNumber}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching license details: ' + error.message);
    }
};

// Function to search for citizen details
export const searchCitizen = async (citizenId) => {
    try {
        const response = await axios.get(`${API_URL}/citizen/${citizenId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching citizen details: ' + error.message);
    }
};