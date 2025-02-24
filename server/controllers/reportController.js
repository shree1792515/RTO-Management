const Report = require('../models/Report');

// Generate report for vehicle registrations by type and region
exports.generateVehicleRegistrationReport = async (req, res) => {
    try {
        const reportData = await Report.aggregate([
            {
                $group: {
                    _id: { type: "$vehicleType", region: "$region" },
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ success: true, data: reportData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Generate report for driving license issuance statistics
exports.generateLicenseIssuanceReport = async (req, res) => {
    try {
        const reportData = await Report.aggregate([
            {
                $group: {
                    _id: { status: "$status", year: { $year: "$issuedDate" } },
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json({ success: true, data: reportData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Generate detailed reports for administrators
exports.generateDetailedReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const reportData = await Report.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        res.status(200).json({ success: true, data: reportData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Generate detailed reports for administrators
exports.getAllReports = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const reportData = await Report.find();
        res.status(200).json({ success: true, data: reportData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};