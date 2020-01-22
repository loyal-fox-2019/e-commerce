const router = require('express').Router()
const products = require('./products')
const users = require('./user')
const cart = require('./cart')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use('/users', users)

router.use(authentication)

router.use('/cart', cart)

router.use(authorization)

router.use('/products', products)

module.exports = router