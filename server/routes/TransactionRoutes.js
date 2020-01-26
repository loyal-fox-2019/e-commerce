const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const TransactionController = require('../controllers/TransactionController')
const {userAuthentication, userAuthorization} = require('../middlewares/auth')

routes.use(userAuthentication)
routes.post('/', userAuthorization, TransactionController.create)

module.exports = routes