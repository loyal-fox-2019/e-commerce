const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

router.get('/', cartController.getAllCartsOnAuthenticatedUser)
router.get('/:status', cartController.getAuthenticatedCartByStatus)
router.post('/:productId', cartController.addProductToAuthenticatedCart)
router.put('/status/all', cartController.updateAllAuthenticatedCartStatus)
router.put('/status/:productId', cartController.updateAuthenticatedCartStatus)
router.put('/:productId', cartController.updateAuthenticatedCartStockByProductId)
router.delete('/:productId', cartController.deleteCartByProductId)

module.exports = router