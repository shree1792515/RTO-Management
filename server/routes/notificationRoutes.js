const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route to send a notification
router.post('/send', notificationController.sendNotification);

// Route to get all notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

// Route to mark a notification as read
// router.put('/read/:notificationId', notificationController.markAsRead);

// Route to delete a notification
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;