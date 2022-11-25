const Router = require('express')
const router = new Router()
const widgetController = require('../controllers/widget.controller')

router.post('/create', widgetController.create)

module.exports = router