const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    amount: {
        required: false,
        type: String
    },
    calories: {
        required: false,
        type: Number
    },
    carbsg: {
        required: false,
        type: Number
    },
    fatg: {
        required: false,
        type: Number
    },
    proteing: {
        required: false,
        type: Number
    },
    meal: {
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

module.exports = mongoose.model('Food', dataSchema)