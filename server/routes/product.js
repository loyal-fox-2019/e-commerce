const router = require('express').Router(),
  ProductController = require('../controllers/product'),
  { authenticate, authorize } = require('../middlewares/auth'),
  upload = require('../middlewares/gcsUpload')

router.get('/', ProductController.all)
router.use(authenticate)
router.get('/sale', ProductController.sale)
router.get('/own', ProductController.own)
router.post('/', upload.single('image'), ProductController.create)
router.delete('/:id', authorize, ProductController.remove)
router.patch('/:id/stock', authorize, ProductController.stock)

module.exports = router