'use strict'

const router = require('express').Router()
const productContoller = require('../controllers/product')
const { authenticate } = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorization')
const Multer = require('multer')
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
})

router.use(authenticate)
router.get('/', productContoller.findAll)
router.get('/:id', productContoller.findOneProduct)
router.post('/', authorization, multer.single('image'), gcsMiddlewares.sendUploadToGCS, productContoller.createProduct)
router.delete('/:id', authorization, productContoller.deleteProduct)
router.put('/:id', authorization, multer.single('image'), gcsMiddlewares.sendUploadToGCS, productContoller.updateProduct)

module.exports = router