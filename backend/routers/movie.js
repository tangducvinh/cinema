const router = require('express').Router()
const { createMovie, getListMovie} = require('../controllers/movie')


router.post('/create', createMovie)
router.get('/list/:type', getListMovie)


module.exports = router