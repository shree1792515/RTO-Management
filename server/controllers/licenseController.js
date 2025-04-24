const License = require('../models/License');
const { v4: uuidv4 } = require('uuid');
const { sendlicenceEmail } = require('../utils/emailService');
const User = require('../models/User');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')
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


exports.renewLicense = async (req, res) => {
    const { licenseNumber, newExpiryDate } = req.body;

    console.log("Renew License Request:", req.body);
    

    try {
        const license = await License.findOne({ licenseNumber });

        if (!license) {
            return res.status(404).json({ message: "License not found" });
        }

        license.expiryDate = newExpiryDate;
        license.status = "RenewedRequest";

        await license.save();

        res.status(200).json({ message: "License renewed successfully", license });
    } catch (error) {

        console.log("Error renewing license:", error);

        res.status(500).json({ message: "Error renewing license", error });
    }
};

exports.generateELicense = async (req, res) => {
    const { licenseNumber } = req.params;

    try {
        const license = await License.findOne({ licenseNumber });

        if (!license) {
            return res.status(404).json({ message: "License not found" });
        }

        const doc = new PDFDocument({
            size: [550, 300],
            layout: 'landscape',
            margins: { top: 20, left: 20, right: 20, bottom: 20 }
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=E-License-${licenseNumber}.pdf`);
        doc.pipe(res);

        // Background banner
        doc.rect(0, 0, 550, 50).fill('#0d47a1');
        doc.fillColor('#fff')
            .fontSize(22)
            .font('Helvetica-Bold')
            .text('DRIVER LICENSE', { align: 'center', baseline: 'middle' });

        const imgX = 30, imgY = 70;
        const avatarPath = path.join(__dirname, '../assets/avatar.png');

        // ✅ Use local asset image as avatar
        if (fs.existsSync(avatarPath)) {
            doc.image(avatarPath, imgX, imgY, { width: 80, height: 100 });
        } else {
            doc.rect(imgX, imgY, 80, 100).stroke();
            doc.fontSize(10).fillColor('#999999').text('No Photo', imgX + 15, imgY + 45);
        }

        // Signature
        doc.fontSize(12).fillColor('black').text(license.holderName, imgX, imgY + 110);
        doc.moveTo(imgX, imgY + 125).lineTo(imgX + 80, imgY + 125).stroke();
        doc.fontSize(10).fillColor('#999').text('Signature', imgX, imgY + 130);

        // License Details
        const startX = 130;
        let y = 70;

        const drawInfo = (label, value) => {

            if (label=="ID") {
                doc.font('Helvetica-Bold').fontSize(10).fillColor('#333').text(`${label}:`, startX, y);
                doc.font('Helvetica').fontSize(7).fillColor('black').text(value, startX + 80, y);
                y += 18;
            }else{
                doc.font('Helvetica-Bold').fontSize(10).fillColor('#333').text(`${label}:`, startX, y);
                doc.font('Helvetica').fontSize(10).fillColor('black').text(value, startX + 80, y);
                y += 18;
            }

           
        };

        drawInfo('ID', license.licenseNumber);
        drawInfo('NAME', license.holderName);
        drawInfo('DOB', license.dateOfBirth);
        drawInfo('SEX', 'M'); // Optional
        drawInfo('CLASS', license.licenseType);
        drawInfo('ISS', license.issueDate);
        drawInfo('EXP', license.expiryDate);
        drawInfo('STATUS', license.status);

        // Donor
        doc.fontSize(10).fillColor('#000').text('DONOR', 450, 70);
        doc.circle(495, 75, 5).fill('red');

        // Barcode placeholder
        doc.rect(420, 220, 100, 30).stroke();
        doc.fontSize(14).text('||| ||| ||||| |||', 430, 227);
      
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating e-license", error });
    }
};



