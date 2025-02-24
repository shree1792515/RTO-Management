const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle");

mongoose.connect("mongodb://localhost:27017/rto_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => console.error("Connection error:", err));

const vehicleData = [
    {
        registrationNumber: "TN01AB1234",
        ownerName: "Vignesh",
        vehicleType: "Car",
        model: "Swift",
        brand: "Maruti Suzuki",
        yearOfManufacture: 2022,
        color: "Red",
        registrationDate: new Date("2025-02-19T10:00:00.000Z"),
        status: "registered"
    },
    {
        registrationNumber: "TN02XY5678",
        ownerName: "Rahul",
        vehicleType: "Bike",
        model: "R15",
        brand: "Yamaha",
        yearOfManufacture: 2021,
        color: "Blue",
        registrationDate: new Date("2025-02-19T11:00:00.000Z"),
        status: "renewed"
    },
    {
        registrationNumber: "TN03ZZ9999",
        ownerName: "Anjali",
        vehicleType: "Scooter",
        model: "Activa",
        brand: "Honda",
        yearOfManufacture: 2020,
        color: "Black",
        registrationDate: new Date("2025-02-19T12:00:00.000Z"),
        status: "pending"
    }
];

const seedDB = async () => {
    await Vehicle.insertMany(vehicleData);
    console.log("Vehicle test data inserted successfully!");
    mongoose.connection.close();
};

seedDB();
