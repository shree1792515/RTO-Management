import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/';

// Function to get admin dashboard data
export const getAdminDashboardData = async () => {
    try {
        const response = await axios.get(`${API_URL}analytics`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching admin dashboard data');
    }
};

// Function to manage user roles
export const manageUserRoles = async (userId, roleData) => {
    try {
        const response = await axios.put(`${API_URL}users/${userId}/roles`, roleData);
        return response.data;
    } catch (error) {
        throw new Error('Error managing user roles');
    }
};

// Function to get system analytics
export const getSystemAnalytics = async () => {
    try {
        const response = await axios.get(`${API_URL}analytics`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching system analytics');
    }
};

// Function to generate reports
export const generateReport = async (reportData) => {
    try {
        const response = await axios.post(`${API_URL}reports`, reportData);
        return response.data;
    } catch (error) {
        throw new Error('Error generating report');
    }
};

// Function to get admin statistics (missing function)
export const getAdminStats = async () => {
    try {
        const response = await axios.get(`${API_URL}stats`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching admin stats');
    }
};


// Function to get admin statistics (missing function)
//http://localhost:5000/api/admin/users
export const getAdminusers = async () => {
    try {
        const response = await axios.get(`${API_URL}users`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching admin stats');
    }
};

