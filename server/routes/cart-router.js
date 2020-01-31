const router = require('express').Router()
const CartController = require('../controllers/cart-controller')
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)
router.get('/', CartController.getUserCart)
router.post('/', CartController.addNewCart)
router.post('/items', CartController.pushItemToCart)
router.patch('/items', CartController.updateItemFromCart)
router.delete('/items', CartController.popItemFromCart)

module.exports = router
