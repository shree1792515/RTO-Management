const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    applicantId: {
        type: String,
        ref: 'User',
        required: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    testDate: {
        type: Date,
        required: true
    },
    result: {
        type: String,
        enum: ['Pass', 'Fail', "Pending"],
        required: true
    },
    remarks: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);