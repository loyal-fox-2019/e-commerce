const express = require('express')
const router = express.Router()
const productController = require('../controllers/product');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorizeProduct');
const gcsUpload = require('../middlewares/gcsUpload');

// define the home page route
router.get('/', productController.getAllProductsByFilter)
router.get('/:id', productController.getProductById)

router.use('/', authentication)
router.post('/', gcsUpload.array('images'), productController.addNewProduct)

router.use('/:id', authorization)
router.put('/:id', gcsUpload.array('images'), productController.editProductById)
router.delete('/:id', productController.deleteProductById)

module.exports = router