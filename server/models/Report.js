const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reportType: {
        type: String,
        required: true,
    },
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    generatedAt: {
        type: Date,
        default: Date.now,
    },
    data: {
        type: Object,
        required: true,
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;