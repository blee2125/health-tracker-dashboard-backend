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
    exerciseNotification: {
        required: false,
        type: Boolean
    },
    foodNotification: {
        required: false,
        type: Boolean
    },
    waterNotification: {
        required: false,
        type: Boolean
    },
    weightNotification: {
        required: false,
        type: Boolean
    },
    goalNotification: {
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