import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// Signup user
const signup = async (userData) => {
    const response = await axios.post(`${API_URL}signup`, userData);
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log(response.data);
    
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    signup,
    login,
    logout,
    getCurrentUser,
};