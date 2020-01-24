const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


/**
 * bikin rute cart untuk increment/decrement qty prod.
 * bikin rute cart untuk add product ke array products.
 * inget send token untuk authenticate authorization untuk cek dia yg punya cart bukan ... 
 * jangan lupa req cart user waktu login nanti idnya dipake untuk cari cart
 * cart yang di client pas logout jangan lupa di clear supaya gabisa dliat org lain
 */
router.post('/:productId', authenticate, CartController.create)
 router.get('/', authenticate, CartController.findOne)
 router.patch('/increment/:cartId', authenticate, CartController.increment)
 router.patch('/decrement/:cartId', CartController.decrement)
 router.patch('/addProduct/:cartId', CartController.addProduct)
 router.patch('/checkout/:cartId', CartController.checkoutCart)

 module.exports = router