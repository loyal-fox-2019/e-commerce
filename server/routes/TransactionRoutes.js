const routes = require('express')
const UserController = require('../controllers/UserController')
const {userAuthentication, userAuthorization} = require('../middlewares/auth')

routes.use(userAuthentication)
routes.patch('/:id', userAuthorization, UserController)

module.exports = routes