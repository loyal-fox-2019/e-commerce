const Cart = require('express').Router()
const CartCon = require('../controllers/CartCon')

//find all cart user
Cart.get('/',CartCon.findAll)
//Cart update cart or add item to cart
Cart.post('/', CartCon.addCart)
//Cart deleted cart or add item to cart
Cart.delete('/', CartCon.removeItem)

module.exports = Cart