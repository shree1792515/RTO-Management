import axios from 'axios';

const API_URL = 'http://localhost:5000/api/licenses/';

// http://localhost:5000/api/licenses/67b6354ad597933568a7d980

// Function to apply for a new driving license
export const applyForLicense = async (licenseData) => {
    const response = await axios.post(`${API_URL}apply`, licenseData,{
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

// Function to renew an existing driving license
export const renewLicense = async (licenseId) => {
    const response = await axios.post(`${API_URL}renew/${licenseId}`);
    return response.data;
};

// Function to get the status of a driving license application
export const getLicenseStatus = async (applicationId) => {
    const response = await axios.get(`${API_URL}status/${applicationId}`);
    return response.data;
};

// Function to schedule a driving test
export const scheduleDrivingTest = async (testData) => {
    const response = await axios.post(`${API_URL}test/schedule`, testData);
    return response.data;
};

// Function to get the results of a driving test
export const getTestResults = async (testId) => {
    const response = await axios.get(`${API_URL}test/results/${testId}`);
    return response.data;
};

export const getAllLicences = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};


export const getAllLicencesuserId = async (id) => {
    const response = await axios.get(`${API_URL+id}`);
    return response.data;
};

export const updateLicensestatus = async (id,status) => {
    const response = await axios.put(`${API_URL+id}`,{status});
    return response.data;
};