const Router = require('express')
const router = new Router()
const widgetController = require('../controllers/widget.controller')

router.post('/create', widgetController.create)
router.post('/delete', widgetController.delete)
router.post('/update', widgetController.updateCors)
router.post('/get', widgetController.getWidget)

module.exports = router