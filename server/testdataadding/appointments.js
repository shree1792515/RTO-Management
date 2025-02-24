const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");


mongoose.connect("mongodb://localhost:27017/rto_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => console.error("Connection error:", err));

const testAppointments = [
    {
        citizenId: "67b6354ad597933568a7d980",
        serviceType: "Vehicle Inspection",
        appointmentDate: new Date("2025-02-25T10:00:00.000Z"),
        status: "Scheduled"
    },
    {
        citizenId: "67b6354ad597933568a7d980",
        serviceType: "License Test",
        appointmentDate: new Date("2025-03-01T09:30:00.000Z"),
        status: "Scheduled"
    },
    {
        citizenId: "67b6354ad597933568a7d980",
        serviceType: "Other",
        appointmentDate: new Date("2025-03-05T14:00:00.000Z"),
        status: "Cancelled"
    },
    {
        citizenId: "67b6354ad597933568a7d980",
        serviceType: "Vehicle Inspection",
        appointmentDate: new Date("2025-03-10T11:00:00.000Z"),
        status: "Completed"
    }
];

const seedDB = async () => {
    await Appointment.insertMany(testAppointments);
    console.log("Test data inserted successfully!");
    mongoose.connection.close();
};

seedDB();
