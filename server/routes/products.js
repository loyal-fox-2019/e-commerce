const router = require('express').Router()
const controller = require('../controllers/productController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/gcsupload')

router.get('/', controller.findAllProducts)

router.get('/:productId', controller.findOneProduct)

router.use(authentication, authorization)

router.post('/', upload.single('productImage'), controller.createProduct)

router.delete('/:productId', controller.deleteProduct)

router.put('/:productId', upload.single('productImage'), controller.updateProduct)

router.patch('/:productId', controller.updateStock)


module.exports = router