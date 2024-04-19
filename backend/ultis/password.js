const bcrypt = require('bcrypt')

const generatePassword = async() => {
    charset = "abcdefghijklmnopqrstuvwxyz0123456789"
    let newPassword = ""
    for (var i = 0, n = charset.length; i < 7; ++i) {
        newPassword += charset.charAt(Math.round(Math.random() * n))
    }

    return newPassword
}

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    
    return hashed
}

module.exports = {
    generatePassword,
    hashPassword
}