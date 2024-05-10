const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['activity', 'empty', 'fix']
    },
    name: {
        type: String,
        require: true
    },
    idRoom: {
        type: mongoose.Types.ObjectId, ref: 'Room',
        required: true
    },
    row: {type: Number},
    number: {type: Number}
})

module.exports = mongoose.model('Seat', seatSchema)