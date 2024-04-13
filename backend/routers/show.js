const router = require('express').Router()

const { createShow, getListShow, getShowDetail, updateBlockSeat } = require('../controllers/show')

router.post('/create', createShow)
router.get('/list', getListShow)
router.get('/detail/:sid', getShowDetail)
router.put('/block-seat', updateBlockSeat)

module.exports = router