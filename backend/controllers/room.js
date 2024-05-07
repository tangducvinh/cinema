const Room = require('../models/room')

// tao phong chieu phim
const createRoom = async(req, res) => {
    try {
        const { name, row, column } = req.body

        const response = await Room.create(req.body)
        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : "Tao phong that bai"
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

const getListRoom = async(req, res) => {
    try {
        console.log('hello')
        const response = await Room.find({})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })

    } catch(e) {
        return res.status(500).json(e)
    }
}







module.exports = {
    createRoom,
    getListRoom
}    