const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')

// dang ky tai khoan
const register = async(req, res) => {
    try {
        const { email, password, name, phone } = req.body

        if (!email || !password || !name || !phone) return res.status(500).json('Missing input')

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const response = await User.create({
            email,
            password: hashed,
            name,
            phone
        })

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data',
            mes: response ? 'Register is successfully' : 'Resgister is faided'
        }) 
    } catch(e) {
        res.status(500).json(e)
    }
}

// dang nhap
const login = async(req, res) => {
    try {
        // account: email || phone
        const { account, password } = req.body

        const response = await User.findOne({$or: [{email: account}, {phone: account}]})

        if (!response) {
            return res.status(404).json('Account didn\'t exist')
        }

        const validPassword = await bcrypt.compare(password, response.password)

        if (!validPassword) {
            return res.status(404).json('Wrong password')
        } else {
            // tao accessToken
            const accessToken = generateAccessToken(response._id, response.role)
            // tao refreshToken
            const refreshToken = generateRefreshToken(response._id)
            // gan refreshToken vao cookie
            res.cookie('refreshToken', refreshToken, {httpOnly: true})
            const { password, role, ...userData } = response.toObject()
            return res.status(200).json({
                success: true,
                data: response ? userData : 'no data',
                accessToken,
            })
        }
    } catch(e) {
        res.status(500).json(e)
    }
}

const refreshToken = async(req, res) => {
    const refreshToken = req.cookie.refreshToken
    if (!refreshToken) {
        return res.status(401).json('You are not authenticated')
    }
    jwt.verify(refreshToken, process.env.SECRET_KEY_RF, (err, decode) => {
        if (err) {
            console.log(err)
        }
        const newAccessToken = generateAccessToken(decode._id, decode.role)
        const newRefreshToken = generateRefreshToken(decode._id, decode.role)

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true
        })

        return res.status(200).json({
            accessToken: newAccessToken
        })
    })
}

const logout = async(req, res) => {
    try {
        res.clearCookie('refreshToken')
        return res.status(200).json('Logout successfully')

    } catch(e) {
        return res.status(500).json(e)
    }
}

const getUser = async(req, res) => {
    try {
        const { _id } = req.user
        
        console.log({_id})

        const response = await User.findOne({_id})

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })
    } catch(e) {
        return res.status(200).json(e)
    }
}

// lay danh sach nguoi dung
const getAllUser = async(req, res) => {
    try {
        const response = await User.find()

        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'no data'
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

// xoa tai khoan
const deleteUser = async(req, res) => {
    try {
        // uid: userId
        const { uid } = req.params

        const response = await User.findByIdAndDelete({_id: uid})

        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Delete user successfully' : 'Something went wrong'
        })
    } catch(e) {
        res.status(500).json(e)
    }
}

module.exports = {
    register,
    deleteUser,
    login,
    getAllUser,
    refreshToken,
    logout,
    getUser,
}