const Router = require('express')
const router = new Router()

const widgetRouter = require('./widget.router')
const roomRouter = require('./room.router')
const userRouter = require('./user.router')

router.use('/user', userRouter)
router.use('/room', roomRouter)
router.use('/widget', widgetRouter)


module.exports = router