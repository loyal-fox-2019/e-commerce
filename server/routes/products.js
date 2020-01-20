const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.post('/', ProductController.create)
router.get('/', ProductController.getAll)
router.get('/:productId', ProductController.getById)
router.patch('/:productId', ProductController.update)
router.delete('/:productId', ProductController.delete)

module.exports = router