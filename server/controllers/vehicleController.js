const Vehicle = require('../models/Vehicle');

// Register a new vehicle
exports.registerVehicle = async (req, res) => {
    try {
        const { ownerName, vehicleType, registrationNumber, model, brand, yearOfManufacture, color, status ,userId} = req.body;

        const newVehicle = new Vehicle({
            userId,
            ownerName,
            vehicleType,
            registrationNumber,
            model,
            brand,
            yearOfManufacture,
            color,
            vehicleImage: req.file ? req.file.path : null,
            status: status || "pending", // Default status to 'pending' if not provided
            registrationDate: new Date(), // Automatically set the registration date
        });
        
        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle registered successfully', vehicle: newVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error registering vehicle', error: error.message });
    }
};

// Renew vehicle registration
exports.renewVehicleRegistration = async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        const vehicle = await Vehicle.findOneAndUpdate(
            { registrationNumber },
            { $set: { registrationStatus: 'Renewed' } },
            { new: true }
        );
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json({ message: 'Vehicle registration renewed successfully', vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error renewing vehicle registration', error: error.message });
    }
};

// Track vehicle registration status
exports.trackVehicleStatus = async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        const vehicle = await Vehicle.findOne({ registrationNumber });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json({ vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking vehicle status', error: error.message });
    }
};

// Get all vehicle registrations
exports.getVehicleRegistrations = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({ vehicles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle registrations', error: error.message });
    }
};

// Get all vehicle registrations
exports.getVehicleRegistrationuserid = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({userId:req.params.id});
        res.status(200).json({ vehicles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle registrations', error: error.message });
    }
};