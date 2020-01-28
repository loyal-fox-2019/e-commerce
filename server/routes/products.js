const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const productAuthorization = require('../middlewares/productAuthorization')
const upload = require('../middlewares/gcsupload')

router.get('/', ProductController.getAll)
router.post('/', authentication, upload.single('picture'), ProductController.create)
router.get('/myProducts', authentication, ProductController.getUserProducts)
router.patch('/:productId', authentication, productAuthorization, upload.single('picture'), ProductController.update)
router.delete('/:productId', authentication, productAuthorization, ProductController.delete)

module.exports = router