const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Types.ObjectId, ref: 'Movie',
    },
    begin_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    roomId: {
        type: mongoose.Types.ObjectId, ref: 'Room'
    },
    block_seats: [
        {
            seatId: {type: mongoose.Types.ObjectId, ref: 'Seat'},
            name: {type: String},
            status: {type: String},
            userId: {type: mongoose.Types.ObjectId, ref: 'User'}
        }
    ]
},{ timestamps: true})

module.exports = mongoose.model('Show', showSchema)