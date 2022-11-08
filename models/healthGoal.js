const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    goal: {
        required: true,
        type: String
    },
    category: {
        required: false,
        type: String
    },
    repeat: {
        required: false,
        type: Boolean,
        default: false
    },
    timeframe: {
        required: false,
        type: String
    },
    endDate: {
        required: false,
        type: String
    },
    completed: {
        required: true,
        type: Boolean,
        default: false
    },
    startDate: {
        required: true,
        type: String,
        default: () => { return new Date() }
    },
    userId: {
        type: String,
        required: true
    }
})

dataSchema.set('timestamps', true);

module.exports = mongoose.model('HealthGoal', dataSchema)