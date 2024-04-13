const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    emaiL: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String
    },
    phone: {
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)