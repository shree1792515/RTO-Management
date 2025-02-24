const User = require('../models/User');
const Report = require('../models/Report');
const Vehicle = require('../models/Vehicle');
const License = require('../models/License');
const Appointment = require('../models/Appointment');

// Admin Dashboard: Get system analytics
exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalReports = await Report.countDocuments();
        const totalVehicleReports = await Vehicle.countDocuments();
        const totalLicense=await License.countDocuments();
        const totalappointments=await Appointment.countDocuments();
        
        // Add more analytics as needed

        res.status(200).json({
            totalUsers,
            totalReports,
            totalVehicleReports,
            totalLicense,
            totalappointments
            // Include more analytics in the response
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics', error });
    }
};

// User Management: Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// User Management: Delete a user
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Additional admin-specific operations can be added here as needed.