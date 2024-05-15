const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        // 9: admin
        // 7: nhan vien
        // 3: nguoi dung usercd 
        enum: [7, 3, 9],
        default: 3,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)