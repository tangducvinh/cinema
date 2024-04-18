const movieRouter = require('./movie')
const roomRouter = require('./room')
const seatRouter = require('./seat')
const showRouter = require('./show')
const userRouter = require('./user')


const initRoutes = (app) => {
    app.use('/api/movie', movieRouter)
    app.use('/api/room', roomRouter)
    app.use('/api/seat', seatRouter)
    app.use('/api/show', showRouter)
    app.use('/api/user', userRouter)
}


module.exports = initRoutes