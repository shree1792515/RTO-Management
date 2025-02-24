const mongoose = require("mongoose");
const Report = require("../models/Report");
// const Report = require("./models/Report");

mongoose.connect("mongodb://localhost:27017/rto_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => console.error("Connection error:", err));

const testReports = [
    {
        reportType: "Vehicle Inspection Summary",
        generatedBy: "67b6354ad597933568a7d980",
        generatedAt: new Date("2025-02-19T22:00:00.000Z"),
        data: {
            totalInspections: 25,
            passCount: 20,
            failCount: 5
        }
    },
    {
        reportType: "License Issue Report",
        generatedBy: "67b6354ad597933568a7d980",
        generatedAt: new Date("2025-02-19T22:05:00.000Z"),
        data: {
            totalLicensesIssued: 50,
            renewals: 30,
            newLicenses: 20
        }
    },
    {
        reportType: "Appointment Status Report",
        generatedBy: "67b6354ad597933568a7d980",
        generatedAt: new Date("2025-02-19T22:10:00.000Z"),
        data: {
            totalAppointments: 40,
            completed: 30,
            scheduled: 8,
            cancelled: 2
        }
    }
];

const seedDB = async () => {
    await Report.insertMany(testReports);
    console.log("Report test data inserted successfully!");
    mongoose.connection.close();
};

seedDB();
