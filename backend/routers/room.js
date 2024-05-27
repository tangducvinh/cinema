const router = require('express').Router()
const { verifyAccessToken, isAdmin, checkRole } = require('../middlewares/verifyToken')
const { createRoom, getListRoom } = require('../controllers/room')

router.post('/create', verifyAccessToken, checkRole, createRoom)
router.get('/list', getListRoom)

module.exports = router