const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, role) => {
    return jwt.sign({_id: uid, role}, process.env.SECRET_KEY, {expiresIn: '1d'})
}

const generateRefreshToken = ( uid, role ) => {
    return jwt.sign({_id: uid, role}, process.env.SECRET_KEY_RF, {expiresIn: '7d'})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}