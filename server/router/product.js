const router = require('express').Router()
const controllerP = require('../controllers/product')
const {authenticating, authorizating} = require('../middlewares/auth')
const upload = require('../helpers/gcs-upload')

router.get('/', controllerP.showAllProducts)

router.get('/mine', authenticating, controllerP.showMyProduct)

router.get('/:id', controllerP.showOneProduct)

router.post('/', authenticating, upload.single('image'), controllerP.create) // blom kasih gcs upload

router.put('/:id', authenticating, authorizating, upload.single('image'), controllerP.updateProductData)

router.delete('/:id', authenticating, authorizating, controllerP.deleteProduct)

module.exports = router