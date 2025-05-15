const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const vehicleupload = require('../middleware/vehiclemulter');

// Route for vehicle registration
router.post('/register',vehicleupload.single("vehicleImage"), vehicleController.registerVehicle);

// Route for vehicle registration renewal
router.post('/renew', vehicleController.renewVehicleRegistration);

// Route for tracking vehicle registration status
router.get('/status/:id', vehicleController.trackVehicleStatus);
router.put('/status/:id', vehicleController.updaetVehicleStatus);


router.get('/all', vehicleController.getVehicleRegistrations);
// getVehicleRegistrationuserid
router.get('/:id', vehicleController.getVehicleRegistrationuserid);

module.exports = router;