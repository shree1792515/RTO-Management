const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const licenseSchema = new mongoose.Schema({
    licenseNumber: {
        type: String,
        unique: true,
        default: function () { return uuidv4(); } // Generate unique license number
    }, holderName: {
        type: String,
        required: true
    },
    userId: { type: String, required: true },
    licenseType: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    documents: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('License', licenseSchema);