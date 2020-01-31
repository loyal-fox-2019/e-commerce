const router = require('express').Router()
const controller = require('../controllers/cartController')

router.post('/', controller.generateCart)

router.delete('/', controller.deleteCart)

router.get('/', controller.getCart)

router.delete('/:id', controller.deleteItem)

module.exports = router