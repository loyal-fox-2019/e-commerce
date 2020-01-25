const router = require('express').Router()
const controllerP = require('../controllers/product')
const {authenticating, authorizating} = require('../middlewares/auth')

router.get('/', controllerP.showAllProducts)

router.get('/mine', authenticating, controllerP.showMyProduct)

router.get('/:id', controllerP.showOneProduct)

router.post('/', authenticating, controllerP.create)

router.put('/:id', authenticating, authorizating, controllerP.updateProductData)

router.delete('/:id', authenticating, authorizating, controllerP.deleteProduct)

module.exports = router