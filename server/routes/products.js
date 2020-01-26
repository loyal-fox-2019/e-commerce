const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const gcsUpload = require('../middlewares/gcsUpload')
const {authenticate} = require('../middlewares/auth')

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)

router.use(authenticate)
router.post('/', gcsUpload.single('image'), ProductController.create)
router.put('/:id', gcsUpload.single('image'), ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router