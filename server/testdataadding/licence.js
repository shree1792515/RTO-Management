const mongoose = require("mongoose");
const License = require("../models/License");
// const License = require("./models/License");

mongoose.connect("mongodb://localhost:27017/rto_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => console.error("Connection error:", err));

const testLicenses = [
    {
        licenseNumber: "TN01-2025-123456",
        holderName: "Vignesh",
        dateOfBirth: new Date("2002-05-15T00:00:00.000Z"),
        issueDate: new Date("2025-01-01T00:00:00.000Z"),
        expiryDate: new Date("2035-01-01T00:00:00.000Z"),
        issuedBy: "RTO Chennai",
        status: "active"
    },
    {
        licenseNumber: "TN02-2023-654321",
        holderName: "Arun Kumar",
        dateOfBirth: new Date("1995-07-20T00:00:00.000Z"),
        issueDate: new Date("2013-08-01T00:00:00.000Z"),
        expiryDate: new Date("2023-08-01T00:00:00.000Z"),
        issuedBy: "RTO Coimbatore",
        status: "expired"
    },
    {
        licenseNumber: "TN03-2021-789012",
        holderName: "Priya Sharma",
        dateOfBirth: new Date("1998-03-10T00:00:00.000Z"),
        issueDate: new Date("2018-06-15T00:00:00.000Z"),
        expiryDate: new Date("2028-06-15T00:00:00.000Z"),
        issuedBy: "RTO Madurai",
        status: "suspended"
    }
];

const seedDB = async () => {
    await License.insertMany(testLicenses);
    console.log("License test data inserted successfully!");
    mongoose.connection.close();
};

seedDB();
