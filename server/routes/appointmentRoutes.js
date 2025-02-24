const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to create a new appointment
router.post('/', appointmentController.scheduleAppointment);

// Route to get all appointments
router.get('/', appointmentController.getallAppointments);

// Route to get a specific appointment by ID
router.get('/:id', appointmentController.getUserAppointments);

// Route to update an appointment by ID
router.put('/:id', appointmentController.updateAppointmentStatus);

// Route to delete an appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

// Route to get appointments by user ID
router.get('/user/:userId', appointmentController.getUserAppointments);

module.exports = router;