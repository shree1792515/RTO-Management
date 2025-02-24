const License = require('../models/License');
const { v4: uuidv4 } = require('uuid');
const { sendlicenceEmail } = require('../utils/emailService');
const User = require('../models/User');
// Function to apply for a new driving license
exports.applyForLicense = async (req, res) => {
    try {
        const { userId, licenseType, dateOfBirth, issueDate, expiryDate, holderName } = req.body;
        const documentPath = req.file ? req.file.path : null;

        if (!documentPath) {
            return res.status(400).json({ message: "Document upload required" });
        }


        const Licenses = await License.find({ userId: userId })
        const user = await User.find()
       
        // / Filtering Admin and Officer
        const adminAndOfficers = user.filter(user => user.role === "Administrator" || user.role === "Officer");

        console.log(adminAndOfficers);





        if (Licenses.length > 0) {
            return res.status(200).json({ message: "Licennce already applied" });
        }

        const newLicense = new License({
            userId,
            holderName,
            licenseType,
            dateOfBirth,
            issueDate,
            expiryDate,
            documents: documentPath
        });

        await newLicense.save();



        adminAndOfficers.map(async(res)=>{

             await sendlicenceEmail(res.email, holderName, licenseType, issueDate, expiryDate, newLicense.licenseNumber, dateOfBirth)

        })



        console.log("compltes");

        res.status(201).json({ message: "License application submitted successfully", license: newLicense });

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: "Error applying for license", error: error.message });
    }
};

// Function to renew an existing driving license
exports.renewLicense = async (req, res) => {
    try {
        const { licenseId } = req.params;
        const updatedLicense = await License.findByIdAndUpdate(licenseId, { status: 'Renewed', updatedAt: new Date() }, { new: true });
        if (!updatedLicense) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json({ message: 'License renewed successfully', license: updatedLicense });
    } catch (error) {
        res.status(500).json({ message: 'Error renewing license', error: error.message });
    }
};

// Function to track the status of a driving license application
exports.trackLicenseStatus = async (req, res) => {
    try {
        const { licenseId } = req.params;
        const license = await License.findById(licenseId);
        if (!license) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json({ message: 'License status retrieved successfully', status: license.status });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking license status', error: error.message });
    }
};


exports.getLicense = async (req, res) => {

    try {
        const licenses = await License.find();
        res.json(licenses);
    } catch (error) {
        console.error("Error fetching licenses:", error);
        res.status(500).json({ error: "Server error" });
    }
};



exports.getLicenseforUserid = async (req, res) => {

    try {
        const licenses = await License.find({ userId: req.params.id });
        res.json(licenses);
    } catch (error) {
        console.error("Error fetching licenses:", error);
        res.status(500).json({ error: "Server error" });
    }
};


exports.updateLicensestatus = async (req, res) => {

    try {
        const licenses = await License.findById(req.params.id);
        licenses.status = req.body.status
        licenses.save()
        res.json({ message: "status updated", licenses });
    } catch (error) {
        console.error("Error fetching licenses:", error);
        res.status(500).json({ error: "Server error" });
    }
};



