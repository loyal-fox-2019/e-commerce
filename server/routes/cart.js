const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

router.get('/', cartController.getAllCartsOnAuthenticatedUser)
router.post('/:productId', cartController.addProductToAuthenticatedCart)
router.put('/:productId', cartController.updateAuthenticatedCartStockByProductId)
router.delete('/:productId', cartController.deleteCartByProductId)

module.exports = router