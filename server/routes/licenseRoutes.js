const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');
const upload = require('../middleware/multer');

// Route to apply for a new driving license
router.post('/apply', upload.single('documents'), licenseController.applyForLicense);

// Route to renew an existing driving license


// Route to get the status of a driving license application
router.get('/status/:id', licenseController.trackLicenseStatus);

// Route to get details of a specific driving license
// router.get('/:id', licenseController.getLicenseDetails);

// // Route to get all licenses for a user
// router.get('/user/:userId', licenseController.getUserLicenses);

router.get('/', licenseController.getLicense);//
router.get('/:id', licenseController.getLicenseforUserid);
router.put('/:id', licenseController.updateLicensestatus);
router.put('/renew/licence', licenseController.renewLicense); // POST or PUT based on your logic
router.get('/generate-e-license/:licenseNumber', licenseController.generateELicense);



module.exports = router;