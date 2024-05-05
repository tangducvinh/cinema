const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    genres: {
        type: Array
    },
    original_language: {
        type: String
    },
    original_title: {
        type: String
    },
    overview: {
        type: String
    },
    popular: {
        type: Number
    },
    poster_path: {
        type: String
    },
    backdrop_path: {
        type: String
    },
    product_company: [
        {
            logo_path: {type: String},
            name: {type: String}
        }
    ],
    release_date: {
        type: Date,
    },
    runtime: {
        type: Number
    },
    spoken_language: {
        type: Array
    },
    status: {
        type: String
    },
    tagline: {
        type: String
    },
    video: [
        {
            name: {type: String},
            key: {type: String},
            site: {type: String},
            type: {type: String}
        }
    ],
    images: {
        type: Array
    },
    cast: [
        {
            name: {type: String},
            avatar: {type: String}
        }
    ],
    director: {type: Array}
}, {timestamps: true})

module.exports = mongoose.model('Movie', movieSchema)