const router = require("express").Router();

const { createShow, getListShow, getShowDetail, updateBlockSeat, getAllShow, deleteShow, updateShow } = require('../controllers/show');
const { verifyAccessToken, checkRole } = require("../middlewares/verifyToken");

router.post('/create', verifyAccessToken, checkRole, createShow)
router.get('/list', getListShow)
router.get('/detail/:sid', getShowDetail)
router.get('/all', getAllShow)
router.put('/block-seat', updateBlockSeat)
router.put('/', verifyAccessToken, checkRole, updateShow)
router.delete('/:sid', verifyAccessToken, checkRole, deleteShow)

module.exports = router;
