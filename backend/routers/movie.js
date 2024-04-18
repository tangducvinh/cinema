const router = require('express').Router()
const { createMovie, getListMovie, updateStatusMovie, deleteMovie} = require('../controllers/movie')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/create', createMovie)
router.get('/list/:type', getListMovie)
router.put('/status', updateStatusMovie)
router.delete('/:mid', deleteMovie)


module.exports = router