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

dataSchema.set('timestamps', true);

module.exports = mongoose.model('Water', dataSchema)