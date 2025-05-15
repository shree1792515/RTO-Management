import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles/';

// Function to register a new vehicle
export const registerVehicle = async (vehicleData) => {
    try {
        const response = await axios.post(`${API_URL}register`, vehicleData,{
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error registering vehicle');
    }
};

// Function to renew an existing vehicle registration
export const renewVehicleRegistration = async (vehicleId) => {
    try {
        const response = await axios.post(`${API_URL}/renew/${vehicleId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error renewing vehicle registration');
    }
};

// Function to track the status of a vehicle registration application
export const trackVehicleStatus = async (applicationId) => {
    try {
        const response = await axios.get(`${API_URL}/status/${applicationId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error tracking vehicle status');
    }
};

export const getVehicleuserid = async (userid) => {
    try {
        const response = await axios.get(`${API_URL}/status/${applicationId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error tracking vehicle status');
    }
};

// Function to fetch all vehicle registrations
export const fetchVehicleRegistrations = async () => {
    try {
        const response = await axios.get(`${API_URL}all`);
      
        
        return response.data.vehicles;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error fetching vehicle registrations');
    }
};

// Function to fetch all vehicle registrations
export const fetchVehicleRegistrationsspecificuser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL+userId}`);
      
        
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error fetching vehicle registrations');
    }
};

export const updateVehicleStatus = async (id,status) => {
    try {
        const response = await axios.put(`${API_URL}status/${id}`,{status});
      //http://localhost:5000/api/vehicles/status/:id
        
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error fetching vehicle registrations');
    }
};