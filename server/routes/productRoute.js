const routes = require('express').Router()
const modelProduct = require('../models/modelProduct')
const controlProduct = require('../controllers/controlProduct')


//nanti kasih authentication dan authorization
routes.post('/', controlProduct.addProduct)

routes.get('/all', controlProduct.getAllProduct)

routes.get('/:name', controlProduct.findByName)

routes.put('/:id', controlProduct.updateProduct)

routes.delete('/:id', controlProduct.deleteProduct)
module.exports = routes