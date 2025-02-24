import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments/';

// Create a new appointment
const createAppointment = async (appointmentData) => {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
};

// Get all appointments
const getAppointments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get pending appointments (missing function)
const getPendingAppointments = async () => {
    const response = await axios.get(`${API_URL}pending`);
    return response.data;
};

// Approve an appointment (missing function)
const approveAppointment = async (id) => {
    const response = await axios.patch(`${API_URL}${id}/approve`);
    return response.data;
};

// Reject an appointment (missing function)
const rejectAppointment = async (id) => {
    const response = await axios.patch(`${API_URL}${id}/reject`);
    return response.data;
};

// Get appointment by ID
const getAppointmentById = async (id) => {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
};

// Update an appointment
const updateAppointment = async (id, appointmentData) => {
    const response = await axios.put(`${API_URL}${id}`, appointmentData);
    return response.data;
};

// Delete an appointment
const deleteAppointment = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
};

export {
    createAppointment,
    getAppointments,
    getPendingAppointments,  // ✅ Added
    approveAppointment,      // ✅ Added
    rejectAppointment,       // ✅ Added
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
