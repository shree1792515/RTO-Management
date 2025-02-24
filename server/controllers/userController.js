const User = require('../models/User');

// Fetch user profile information
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID is stored in req.user
        const user = await User.findById(userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile information
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// delete user profile information
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const updatedData = req.body;

        const user = await User.findByIdAndDelete(userId, updatedData, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};