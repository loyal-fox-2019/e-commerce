const express = require('express')
const route = express.Router()
const user = require('./user')
const cart = require('./cart')
const item = require('./item')
const transaction = require('./transaction')
const {authenticate} = require('../midllewares/loginUserAuth')


route.use('/users',user)
route.use('/items',item)
route.use(authenticate)
route.use('/carts',cart)
route.use('/transactions',transaction)



module.exports = route