const router = require('express').Router()
const products = require('./products')
const users = require('./user')
const cart = require('./cart')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')

router.use('/users', users)

router.use('/products', products)

router.use(authentication)

router.use('/cart', cart)

router.use(errorHandler)

module.exports = router