const express = require("express")
const router = express.Router()
const { userController, cartController } = require("../controllers")
const { authentication } = require('../middlewares');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use(authentication)
router.post('/cart', cartController.addToCart)
router.get('/cart',cartController.showCart)
router.delete('/cart/:productId', cartController.removeCartItem)
router.get('/cart/cities', cartController.fetchCities)
router.post('/cart/shippingFee', cartController.getShippingFee)

module.exports = router