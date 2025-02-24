const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to search for vehicle registration details
router.get('/vehicles', searchController.searchVehicleByRegistration);

// Route to search for license records
router.get('/licenses', searchController.searchLicenseByNumber);

// Route to search for citizen details
// router.get('/citizens', searchController.searchCitizens);

module.exports = router;