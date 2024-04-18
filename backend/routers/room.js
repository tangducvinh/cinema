const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const { createRoom } = require('../controllers/room')

router.post('/create', createRoom)

module.exports = router