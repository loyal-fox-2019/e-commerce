const express = require('express')
const router = express.Router()
const { ProductController } = require('../controllers')
const authorizeProductOwner = require('../middlewares/authorizeProductOwner')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/gcsUpload')

router.get('/', ProductController.showProducts)
router.get('/myItem', authenticate, ProductController.getUserProducts)
router.get('/othersItem', authenticate, ProductController.getOtherUserProducts)
router.get('/:productId', ProductController.showProduct)
router.use(authenticate)
router.post('/', upload.single('image'), ProductController.postProduct)
router.use('/:productId', authorizeProductOwner)
router.patch('/:productId', upload.single('image'), ProductController.editProduct)
router.delete('/:productId', ProductController.deleteProduct)

module.exports = router
