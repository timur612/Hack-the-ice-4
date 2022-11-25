const Router = require('express')
const router = new Router()
const roomController = require('../controllers/room.controller')

router.post('/create', roomController.create)
router.post('/delete', roomController.delete)
router.post('/getUsers',roomController.getUsers)
router.get('/getall', roomController.getAll)

module.exports = router