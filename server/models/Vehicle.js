const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    ownerName: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    yearOfManufacture: {
        type: Number,
        required: true
    },
    vregistrationNumber:{
        type: String,
         default: '1234'
    },
    color: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    vehicleImage: { type: String },
    status: {
        type: String,
        enum: ['registered', 'renewed', 'pending'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);