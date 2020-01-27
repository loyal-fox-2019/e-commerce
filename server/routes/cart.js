'use strict'

const router = require('express').Router()
const cartController = require('../controllers/cart')
const { authenticate } = require('../middlewares/authenticate')

router.use(authenticate)
router.get('/', cartController.getCart)
router.get('/province', cartController.getProvince)
router.get('/city', cartController.getCities)
router.put('/checkout', cartController.checkoutCart)
router.delete('/:cartId', cartController.deleteCartItem)
router.post('/cost', cartController.getCosts)
router.post('/:productId', cartController.createCartItem)

module.exports = router