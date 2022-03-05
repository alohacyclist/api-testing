const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    places: {
        type: String,
        coordinates: [Number],
    }
})

module.exports = mongoose.model('User', userSchema)