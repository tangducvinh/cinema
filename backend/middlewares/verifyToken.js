const jwt = require('jsonwebtoken')

const verifyAccessToken = async(req, res, next) => {
    const token = req.headers.token
    if(token) {
        const accessToken = token.split(' ')[1]
        jwt.verify(accessToken, process.env.SECRET_KEY, (err, decode) => {
            if(err) {
                return res.status(403).json('Token is valid')
            }
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json('You are not authenticated')
    }
}

const isAdmin = async(req, res, next) => {
    const { role } = req.user
    // 9 la admin
    if (role === '9') {
        next()
    } else {
        return res.status(403).json('You are not admin')
    }
}

module.exports = {
    verifyAccessToken,
    isAdmin
}










