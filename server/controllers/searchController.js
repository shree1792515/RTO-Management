const Vehicle = require('../models/Vehicle');
const License = require('../models/License');

// Search for vehicle records by registration number
exports.searchVehicleByRegistration = async (req, res) => {
    const { registrationNumber } = req.query;

    try {
        const vehicle = await Vehicle.findOne({ registrationNumber });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Search for license records by license number
exports.searchLicenseByNumber = async (req, res) => {
    const { licenseNumber } = req.query;

    try {
        const license = await License.findOne({ licenseNumber });
        if (!license) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};