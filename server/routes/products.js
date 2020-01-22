const router = require('express').Router()
const controller = require('../controllers/productController')

router.get('/', controller.findAllProducts)

router.post('/', controller.createProduct)

router.get('/:productId', controller.findOneProduct)

router.delete('/:productId', controller.deleteProduct)

router.put('/:productId', controller.updateProduct)

router.patch('/:productId', controller.updateStock)


module.exports = router