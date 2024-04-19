const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

const { register, deleteUser, login, getAllUser, refreshToken, logout, getUser, sendNewPassword, changePassword } = require('../controllers/user')

// lay thong tin cua toan bo user
router.get('/all', [verifyAccessToken, isAdmin], verifyAccessToken, getAllUser)
// lay thong tin cua 1 user
router.get('/infor-user', [verifyAccessToken], getUser)
router.post('/login', login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)
router.post('/send-password', sendNewPassword)
router.post('/change-password', [verifyAccessToken], changePassword)
router.delete('/:uid', [verifyAccessToken, isAdmin], deleteUser)

module.exports = router