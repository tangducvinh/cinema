const Movie = require('../models/movie')


const createMovie = async(req, res) => {
    try {
        console.log(req.body)
        const response = await Movie.create(req.body)

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })

    } catch(e) {
        res.json(e)
    }
}

const getListMovie = async(req, res) => {
    try {
        // type:
        // - soon: sap chieu
        // - showing: dang chieu
        const { type } = req.params
        console.log(type)

        const response = await Movie.find({status: type})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports = {
    createMovie,
    getListMovie
}



