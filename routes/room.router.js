const Router = require('express')
const router = new Router()
const roomController = require('../controllers/room.controller')

router.post('/create', roomController.create)
router.get('/getall', roomController.getAll)

module.exports = router