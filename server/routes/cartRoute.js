const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/:productId', authenticate, CartController.create)
router.get('/', authenticate, CartController.findAll)
router.put('/:cartId', authenticate, CartController.update)
router.delete('/', CartController.deleteCart)

 module.exports = router