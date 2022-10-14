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
    }
})

module.exports = mongoose.model('Exercise', dataSchema)