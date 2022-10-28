const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    height: {
        required: false,
        type: String
    }
})

dataSchema.set('timestamps', true);

module.exports = mongoose.model('User', dataSchema)