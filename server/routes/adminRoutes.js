const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get system analytics  
                       //authMiddleware.verifyAdmin
router.get('/analytics',adminController.getAnalytics);

// Route to manage user roles
// router.post('/user/roles', authMiddleware.verifyAdmin, adminController.manageUserRoles);

// Route to get reports
router.get('/reports', adminController.getReports);

// Route to fetch all users
router.get('/users', adminController.getAllUsers);

// Route to delete a user
router.delete('/user/:id',authMiddleware.adminMiddleware, adminController.deleteUser);

module.exports = router;