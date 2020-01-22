const router = require('express').Router()
const controller = require('../controllers/cartController')

router.post('/', controller.generateCart)

router.delete('/', controller.deleteCart)

module.exports = router