const Notification = require('../models/Notification');
const User = require('../models/User');
const emailService = require('../utils/emailService');

// Function to send notifications to users
exports.sendNotification = async (req, res) => {
    const { userId, message } = req.body;

    try {
        // Find the user to notify
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new notification
        const notification = new Notification({
            userId: user._id,
            message: message,
            date: new Date(),
        });

        // Save the notification to the database
        await notification.save();

        // Send an email notification
        await emailService.sendEmail(user.email, 'New Notification', message);

        return res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending notification', error });
    }
};

// Function to get notifications for a user
exports.getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch notifications for the user
        const notifications = await Notification.find({ userId: userId }).sort({ date: -1 });

        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// Function to delete a notification
exports.deleteNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        // Delete the notification
        await Notification.findByIdAndDelete(notificationId);

        return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting notification', error });
    }
};