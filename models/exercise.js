const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    exerciseName: {
        required: true,
        type: String
    },
    duration: {
        required: false,
        type: Number
    },
    timeOfExercise: {
        required: false,
        type: String
    },
    typeOfExercise: {
        required: false,
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