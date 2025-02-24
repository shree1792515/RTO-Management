const mongoose = require("mongoose");
const Test = require("../models/Test");
// const Test = require("./models/Test");

mongoose.connect("mongodb://localhost:27017/rto_management_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => console.error("Connection error:", err));

const testData = [
    {
        applicantId: "67b6354ad597933568a7d980",
        vehicleId: "67b6404ad597933568a7d990",
        testDate: new Date("2025-02-20T10:00:00.000Z"),
        result: "Pass",
        remarks: "Good control over the vehicle"
    },
    {
        applicantId: "67b6354ad597933568a7d980",
        vehicleId: "67b6404ad597933568a7d991",
        testDate: new Date("2025-02-20T11:00:00.000Z"),
        result: "Fail",
        remarks: "Did not check mirrors before lane change"
    },
    {
        applicantId: "67b6354ad597933568a7d980",
        vehicleId: "67b6404ad597933568a7d992",
        testDate: new Date("2025-02-20T12:00:00.000Z"),
        result: "Pass",
        remarks: "Smooth braking and acceleration"
    }
];

const seedDB = async () => {
    await Test.insertMany(testData);
    console.log("Test data inserted successfully!");
    mongoose.connection.close();
};

seedDB();
