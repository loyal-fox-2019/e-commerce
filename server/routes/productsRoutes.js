const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/gcs-upload')
const ProductController = require('../controllers/productController')

router.get('/', authentication, ProductController.findAll)
router.post('/', authentication, upload.single('picture'), ProductController.create)
router.get('/user', authentication, ProductController.findAllbyUser)
router.get('/products/:productId', authentication, ProductController.findOne)

router.delete('/products/:productId', authentication, authorization, ProductController.delete)
router.put('/products/:productId', authentication, authorization, upload.single('picture'), ProductController.update)

module.exports = router

