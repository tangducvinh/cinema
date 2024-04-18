const Movie = require('../models/movie')

// tao phim
const createMovie = async(req, res) => {
    try {
        const response = await Movie.create(req.body)

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })

    } catch(e) {
        res.json(e)
    }
}

// lay danh sach cac phim
const getListMovie = async(req, res) => {
    try {
        // type:
        // - soon: sap chieu
        // - showing: dang chieu
        const { type } = req.params

        const response = await Movie.find({status: type})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

// thay doi trang thai phim sap chieu, dang chieu
const updateStatusMovie = async(req, res) => {
    try {
        // mid: movieId
        // status soon: sap chieu        showing: dang chieu
        const { mid, status } = req.body
        
        const response = await Movie.findByIdAndUpdate({_id: mid}, {status}, {new: true})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

// xoa phim 
const deleteMovie = async(req, res) => {
    try {
        const { mid } = req.params

        const response = await Movie.findByIdAndDelete({_id: mid})

        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Delete movie successfully' : 'Delete movie failed'
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports = {
    createMovie,
    getListMovie,
    updateStatusMovie,
    deleteMovie
}



