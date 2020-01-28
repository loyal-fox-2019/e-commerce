const express = require('express')
const cart = express.Router()
const { cartController } = require('../controllers')
const { authentication, authorization } = require('../middlewares');

cart.use(authentication)
cart.post('/', cartController.addToCart)
cart.get('/',cartController.showCart)
cart.delete('/:productId', cartController.removeCartItem)



module.exports = cart