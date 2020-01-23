const routes = require('express').Router()
const ItemRoutes = require('./ItemRoutes')
const UserRoutes = require('./UserRoutes')
const UserController = require('../controllers/UserController')

routes.post('/createAdmin', UserController.createAdmin)
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

routes.use('/item', ItemRoutes)
routes.use('/user', UserRoutes)

module.exports = routes