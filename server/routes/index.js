const routes = require('express').Router()
const routeProduct = require('./productRoute')
const routeUser = require('./userRoute')

routes.use('/product', routeProduct)
routes.use('/user', routeUser)

module.exports = routes