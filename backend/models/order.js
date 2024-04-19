const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    movieID: {
        type: mongoose.Types.ObjectId, ref: 'Movie'
    },
    total_pay: {
        type: Number
    },
    seats: {
        type: Array,
    },
    status: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    method_pay: string,
    showId: {
        type: mongoose.Types.ObjectId, ref: 'Show'
    }

}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)