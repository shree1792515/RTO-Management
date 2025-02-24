const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to generate reports
router.get('/generate', reportController.generateVehicleRegistrationReport);

// Route to get report statistics
router.get('/statistics', reportController.generateLicenseIssuanceReport);
router.get('/all', reportController.getAllReports); // Get all reports
// Route to fetch specific report by ID
// router.get('/:id', reportController.getReportById);

// Route to delete a report by ID
// router.delete('/:id', reportController.deleteReport);

module.exports = router;