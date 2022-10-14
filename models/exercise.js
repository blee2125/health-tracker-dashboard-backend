const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    exerciseName: {
        required: true,
        type: String
    },
    duration: {
        required: true,
        type: Number
    },
    timeOfExercise: {
        required: true,
        type: Date
    },
    typeOfExercise: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String,
        default: () => { return new Date() }
    }
})

dataSchema.set('timestamps', true);

module.exports = mongoose.model('Exercise', dataSchema)