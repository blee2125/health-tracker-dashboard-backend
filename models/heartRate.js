const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    heartRate: {
        required: false,
        type: String
    },
    notes: {
        required: false,
        type: String
    },
    time: {
        required: true,
        type: String,
    },
    date: {
        required: false,
        type: String,
        default: () => { return new Date() }
    },
    userId: {
        type: String,
        required: true
    }
})

dataSchema.set('timestamps', true);

module.exports = mongoose.model('HeartRate', dataSchema)