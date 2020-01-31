const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/gcs-upload')
const ProductController = require('../controllers/productController')

router.get('/', authentication, ProductController.findAll)
router.post('/', authentication, upload.single('picture'), ProductController.create)
router.get('/user', authentication, ProductController.findAllbyUser)
router.get('/:productId', authentication, ProductController.findOne)

router.delete('/:productId', authentication, authorization, ProductController.delete)
router.put('/:productId', authentication, authorization, upload.single('picture'), ProductController.update)
router.put('/qty/:productId', authentication, ProductController.updateQty)

module.exports = router

