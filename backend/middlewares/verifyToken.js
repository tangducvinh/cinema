const jwt = require('jsonwebtoken')

const verifyAccessToken = async(req, res, next) => {
    const token = req.headers.token
    if(token) {
        const accessToken = token.split(' ')[1]
        jwt.verify(accessToken, 'dfdsfsdfdf', (err, decode) => {
            if(err) {
                return res.status(403).json('Token is valid')
            }
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json('Bạn chưa đăng nhập')
    }
}

const checkRole = async(req, res, next) => {
    const { role } = req.user
    
    console.log('hello 1')

    if (role === '7') {
        return next()
    } else if (role === '9') {
        return next()
    } else {
        return res.status(403).json('Tài khoản bạn không có quyền truy cập')
    }
}

const isAdmin = async(req, res, next) => {
    const { role } = req.user
    // 9 la admin
    if (role === '9') {
        next()
    } else {
        return res.status(403).json('Quyền này chỉ dành cho admin')
    }
}

module.exports = {
    verifyAccessToken,
    isAdmin,
    checkRole,
}










