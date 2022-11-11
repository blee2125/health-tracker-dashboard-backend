const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    collectExerciseData: {
        required: true,
        type: Boolean,
        default: true
    },
    collectFoodData: {
        required: true,
        type: Boolean,
        default: true
    },
    collectWaterData: {
        required: true,
        type: Boolean,
        default: true
    },
    collectWeightData: {
        required: true,
        type: Boolean,
        default: true
    },
    notifications: {
        required: false,
        type: Boolean
    },
    userId: {
        type: String,
        required: true
    }
})

dataSchema.set('timestamps', true);

module.exports = mongoose.model('Settings', dataSchema)