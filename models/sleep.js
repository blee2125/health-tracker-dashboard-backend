const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bedtime: {
        required: true,
        type: String
    },
    wakeUpTime: {
        required: true,
        type: String
    },
    totalTime: {
        required: true,
        type: Number
    },
    activityBefore: {
        required: false,
        type: String
    },
    time: {
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

module.exports = mongoose.model('Sleep', dataSchema)