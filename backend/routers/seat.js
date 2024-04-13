const router = require('express').Router()

const { createSeat, getListSeat } = require('../controllers/seat')

router.post('/create', createSeat)
router.get('/list-seat', getListSeat)

module.exports = router