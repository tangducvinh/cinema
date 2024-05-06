const router = require("express").Router();

const { createShow, getListShow, getShowDetail, updateBlockSeat, getAllShow, deleteShow } = require('../controllers/show')

router.post('/create', createShow)
router.get('/list', getListShow)
router.get('/detail/:sid', getShowDetail)
router.get('/all', getAllShow)
router.put('/block-seat', updateBlockSeat)
router.delete('/:sid', deleteShow)

module.exports = router;
