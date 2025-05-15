const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const { sendVehicleregisterationEmail } = require('../utils/emailService');

// Register a new vehicle
exports.registerVehicle = async (req, res) => {
    try {
        const { ownerName, vehicleType, registrationNumber, model, brand, yearOfManufacture, color, status ,userId} = req.body;
        if (!ownerName || !vehicleType || !registrationNumber) {
            return res.status(400).json({ message: "Required fields are missing." });
        }
        const user = await User.find()
       
        // / Filtering Admin and Officer
        const adminAndOfficers = user.filter(user => user.role === "Administrator" || user.role === "Officer");

        console.log(adminAndOfficers);



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

        adminAndOfficers.map(async(res)=>{

            await sendVehicleregisterationEmail(res.email,ownerName,vehicleType,model,brand,yearOfManufacture,color,registrationNumber)
            

        })


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

exports.updaetVehicleStatus = async (req, res) => {
    try {

        console.log(req.body);
        
        const { id } = req.params;
        const { status } = req.body; // new status from request body

        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (status) {
            vehicle.status = status; // update status if provided
            await vehicle.save();
        }

        res.status(200).json({ message: 'Vehicle status updated successfully', vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking/updating vehicle status', error: error.message });
    }
};
