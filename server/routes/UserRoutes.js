const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const {userAuthentication, userAuthorization} = require('../middlewares/auth')

routes.use(userAuthentication)
routes.patch('/add_to_cart', userAuthorization, UserController.addToCart)
routes.patch('/remove_from_cart', userAuthorization, UserController.removeFromCart)


module.exports = routes