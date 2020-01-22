const routes = require('express').Router()
const ItemRoutes = require('./ItemRoutes')
const UserController = require('../controllers/UserController')

routes.post('/createAdmin', UserController.createAdmin)
routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

routes.use('/item', ItemRoutes)

module.exports = routes