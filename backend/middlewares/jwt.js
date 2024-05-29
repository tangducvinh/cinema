const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, role) => {
    return jwt.sign({_id: uid, role}, 'dfdsfsdfdf', {expiresIn: '1d'})
}

const generateRefreshToken = ( uid, role ) => {
    return jwt.sign({_id: uid, role}, 'dfdfdfdf', {expiresIn: '365d'})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}