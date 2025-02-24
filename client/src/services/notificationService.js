import axios from 'axios';

const API_URL = '/api/notifications';

// Function to send a notification
export const sendNotification = async (notificationData) => {
    try {
        const response = await axios.post(`${API_URL}/send`, notificationData);
        return response.data;
    } catch (error) {
        throw new Error('Error sending notification: ' + error.message);
    }
};

// Function to get notifications for a user
export const getUserNotifications = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching notifications: ' + error.message);
    }
};

// Function to mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await axios.put(`${API_URL}/read/${notificationId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error marking notification as read: ' + error.message);
    }
};