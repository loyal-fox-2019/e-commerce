const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const {userAuthentication, userAuthorization} = require('../middlewares/auth')

routes.use(userAuthentication)
routes.patch('/add_to_cart/:id', userAuthorization, UserController.addToCart)


module.exports = routes