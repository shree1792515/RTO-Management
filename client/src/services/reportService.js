import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports/';

// Function to fetch reports
export const fetchReports = async () => {
    try {
        const response = await axios.get(API_URL+"all");
        return response.data.data;
    } catch (error) {
        throw new Error('Error fetching reports: ' + error.message);
    }
};

// Function to generate a report
export const generateReport = async (reportData) => {
    try {
        const response = await axios.post(API_URL, reportData);
        return response.data;
    } catch (error) {
        throw new Error('Error generating report: ' + error.message);
    }
};

// Function to fetch report by ID
export const fetchReportById = async (reportId) => {
    try {
        const response = await axios.get(`${API_URL}/${reportId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching report by ID: ' + error.message);
    }
};