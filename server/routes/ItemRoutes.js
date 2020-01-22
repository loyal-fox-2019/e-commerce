const routes = require('express').Router()
const ItemController = require('../controllers/ItemController')
const {userAuthentication, adminAuthorization} = require('../middlewares/auth')

routes.post('/', userAuthentication, adminAuthorization, ItemController.create)
routes.get('/', ItemController.read)
routes.get('/:id', ItemController.readOne)
routes.patch('/:id', userAuthentication, adminAuthorization, ItemController.updateOne)
routes.delete('/:id', userAuthentication, adminAuthorization, ItemController.deleteOne)

module.exports = routes