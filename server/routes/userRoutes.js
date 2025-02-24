const express = require('express');
const { 
    getUserProfile, 
    updateUserProfile, 
    deleteUser 
} = require('../controllers/userController');

const router = express.Router();

// Route to get user profile
router.get('/:id', getUserProfile);

// Route to update user profile
router.put('/:id', updateUserProfile);

// Route to delete user
router.delete('/:id', deleteUser);

module.exports = router;