const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }, 
    row: {type: Number},
    column: {type: Number}
}, {timestamps: true})

module.exports = mongoose.model('Room', roomSchema)