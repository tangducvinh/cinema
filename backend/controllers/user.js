const User = require('../models/user')

const createUser = async(req, res) => {
    try {

    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports = {
    createUser
}