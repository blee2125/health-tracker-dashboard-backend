const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    glasses: {
        required: true,
        type: Number
    },
    time: {
        required: true,
        type: String,
        default: () => { return new Date() }
    }
})

module.exports = mongoose.model('Water', dataSchema)