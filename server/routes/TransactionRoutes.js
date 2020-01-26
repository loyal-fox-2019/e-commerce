const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const TransactionController = require('../controllers/TransactionController')
const {userAuthentication, userAuthorization, adminAuthorization} = require('../middlewares/auth')

routes.use(userAuthentication)
routes.post('/', userAuthorization, TransactionController.create)
routes.get('/', adminAuthorization, TransactionController.read)
routes.get('/:id', userAuthorization, TransactionController.readOne)
routes.patch('/:id', userAuthorization, TransactionController.updateDeliverySent)

module.exports = routes