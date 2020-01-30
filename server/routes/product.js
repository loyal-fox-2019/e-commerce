const express = require('express')
const router = express.Router()
const Product = require('../controllers/productController')
const auth = require('../middlewares/auth')
const gcs = require('../middlewares/gcs')

router.get('/', Product.getAllProduct)
router.post(
  '/',
  auth.authentication,
  auth.adminOnly,
  gcs.single('file'),
  Product.createProduct
)
router.delete(
  '/:productId',
  auth.authentication,
  auth.adminOnly,
  Product.delete
)
router.patch('/:productId', auth.authentication, auth.adminOnly, Product.update)
module.exports = router
