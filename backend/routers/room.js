const router = require('express').Router()

const { createRoom } = require('../controllers/room')

router.post('/create', createRoom)

module.exports = router