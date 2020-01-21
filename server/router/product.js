const router = require('express').Router()
const Controller = require('../controllers/product')

router.get('/', Controller.getAllProduct)
router.post('/', Controller.addProduct)
router.delete('/:id', Controller.deleteProduct)
router.patch('/:id/stock', Controller.updateProductStock)

module.exports = router