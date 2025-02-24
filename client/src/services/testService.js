import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tests/';

// Create a new driving test
const createTest = async (testData) => {
    const response = await axios.post(API_URL+"create", testData);
    return response.data;
};

// Get all driving tests
const getTests = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get a specific driving test by ID
const getTestById = async (testId) => {
    const response = await axios.get(`${API_URL}${testId}`);
    return response.data;
};

// Update a driving test
const updateTest = async (testId, testData) => {
    const response = await axios.put(`${API_URL}${testId}`, testData);
    return response.data;
};

// Delete a driving test
const deleteTest = async (testId) => {
    const response = await axios.delete(`${API_URL}${testId}`);
    return response.data;
};

const getTestuserById=async (Id) => {
    const response = await axios.get(`${API_URL}${Id}`);
    return response.data;
};



export { createTest, getTests, getTestById, updateTest, deleteTest,getTestuserById };