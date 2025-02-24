const Appointment = require('../models/Appointment');

// Schedule a new appointment
exports.scheduleAppointment = async (req, res) => {

    console.log(req.body);
    
    try {
        const { userId, serviceType, appointmentDate } = req.body;
        const newAppointment = new Appointment({
            citizenId:userId,
            serviceType,
            appointmentDate,
            status: 'Scheduled'
        });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment scheduled successfully', appointment: newAppointment });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Error scheduling appointment', error: error.message });
    }
};

// Get all appointments for a user
exports.getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.find({ userId });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};


exports.getallAppointments = async (req, res) => {
    try {
        
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        
        const { status } = req.body;
        const updatedAppointment = await Appointment.findByIdAndUpdate( { _id: id },
            { status },
            { new: true });
        console.log(updatedAppointment);
       
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment status updated successfully', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status', error: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment', error: error.message });
    }
};