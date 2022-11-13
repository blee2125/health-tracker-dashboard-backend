const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    systolic: {
        required: true,
        type: String
    },
    diastolic: {
        required: true,
        type: String
    },
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

module.exports = mongoose.model('BloodPressure', dataSchema)