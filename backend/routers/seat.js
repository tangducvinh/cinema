const router = require('express').Router()
const { checkRole, verifyAccessToken} = require('../middlewares/verifyToken')

const { createSeat, getListSeat, updateSeat } = require('../controllers/seat')

router.post('/create', createSeat)
router.get('/list-seat', getListSeat)
router.put('', updateSeat)

module.exports = router