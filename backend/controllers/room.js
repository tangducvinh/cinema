const Room = require('../models/room')

// tao phong chieu phim
const createRoom = async(req, res) => {
    try {
        const { name, row, column } = req.body

        console.log('hello')
        console.log(req.body)

        const response = await Room.create(req.body)
        res.json({
            success: response ? true : false,
            data: response ? response : "Tao phong that bai"
        })
    } catch(e) {
        res.status(500).json(e)
    }
}







module.exports = {
    createRoom
}    