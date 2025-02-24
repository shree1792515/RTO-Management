import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Function to get user profile
export const getUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user profile');
    }
};

// Function to update user profile
export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}${userId}`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating user profile');
    }
};

// Function to delete user account
export const deleteUserAccount = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting user account');
    }
};