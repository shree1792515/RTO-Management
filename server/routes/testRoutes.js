const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// Route to create a new driving test
router.post('/create', testController.createTest);

// Route to get all driving tests
router.get('/', testController.getAllTests);

// Route to get a specific driving test by ID
router.get('/:id', testController.getTestuserById);


// Route to get a specific driving test by ID
router.get('/specific/:id', testController.getTestById);

// Route to update a driving test by ID
router.put('/:id', testController.updateTest);

// Route to delete a driving test by ID
router.delete('/:id', testController.deleteTest);

module.exports = router;