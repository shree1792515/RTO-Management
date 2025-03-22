import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports/';

export const fetchReports = async () => {
    try {
        const response = await axios.get(API_URL + "all");
        const { reportData } = response.data;

        // Transforming data to match frontend expectations
        let transformedReports = [];

        // Process users
        if (reportData.user) {
            reportData.user.forEach(user => {
                transformedReports.push({
                    reportType: "User Report",
                    generatedBy: user.username,
                    generatedAt: user.createdAt,
                    data: {
                        Role: user.role,
                        Email: user.email,
                        CreatedAt: user.createdAt
                    }
                });
            });
        }

        // Process licenses
        if (reportData.license) {
            reportData.license.forEach(license => {
                transformedReports.push({
                    reportType: "License Report",
                    generatedBy: license.holderName,
                    generatedAt: license.createdAt,
                    data: {
                        LicenseType: license.licenseType,
                        Status: license.status,
                        ExpiryDate: license.expiryDate,
                        LicenseNumber: license.licenseNumber
                    }
                });
            });
        }

        // Process vehicles
        if (reportData.vehicle) {
            reportData.vehicle.forEach(vehicle => {
                transformedReports.push({
                    reportType: "Vehicle Report",
                    generatedBy: vehicle.ownerName,
                    generatedAt: vehicle.registrationDate,
                    data: {
                        VehicleType: vehicle.vehicleType,
                        Brand: vehicle.brand,
                        Model: vehicle.model,
                        Color: vehicle.color,
                        RegistrationNumber: vehicle.registrationNumber
                    }
                });
            });
        }

        // Process tests
        if (reportData.test) {
            reportData.test.forEach(test => {
                transformedReports.push({
                    reportType: "Test Report",
                    generatedBy: "System",
                    generatedAt: test.testDate,
                    data: {
                        Remarks: test.remarks,
                        ApplicantID: test.applicantId,
                        VehicleID: test.vehicleId
                    }
                });
            });
        }

        return transformedReports;
    } catch (error) {
        throw new Error("Error fetching reports: " + error.message);
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