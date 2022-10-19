const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    calories: {
        required: false,
        type: Number
    },
    timeOfConsumption: {
        required: false,
        type: String
    },
    meal: {
        required: false,
        type: String
    },    
    placeOfConsumption: {
        required: false,
        type: String
    },
    withWhom: {
        required: false,
        type: String
    },    
    activity: {
        required: false,
        type: String
    },
    mood: {
        required: false,
        type: String
    },    
    hungerLevel: {
        required: false,
        type: String
    },
    fullness: {
        required: false,
        type: String
    },    
    amount: {
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

module.exports = mongoose.model('Food', dataSchema)