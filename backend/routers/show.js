const router = require("express").Router();

const { createShow, getListShow, getShowDetail, updateBlockSeat, getAllShow, deleteShow, updateShow } = require('../controllers/show')

router.post('/create', createShow)
router.get('/list', getListShow)
router.get('/detail/:sid', getShowDetail)
router.get('/all', getAllShow)
router.put('/block-seat', updateBlockSeat)
router.put('/', updateShow)
router.delete('/:sid', deleteShow)

module.exports = router;
