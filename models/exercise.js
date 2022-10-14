const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    exerciseName: {
        required: true,
        type: Text
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
        type: text
    },
    time: {
        required: true,
        type: String,
        default: () => { return new Date() }
    }
})

dataSchema.set('timestamps', true);

module.exports = mongoose.model('Exercise', dataSchema)