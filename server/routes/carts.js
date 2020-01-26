const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authenticate} = require('../middlewares/auth')

router.use(authenticate)
router.get('/', CartController.getCart)
router.post('/', CartController.add)
router.post('/checkout', CartController.checkout)

module.exports = router