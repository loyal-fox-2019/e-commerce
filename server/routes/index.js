const express = require('express')
const router = express.Router()
const productsRouter = require('./products')
const usersRouter = require('./users')
const cartsRouter = require('./carts')

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/carts', cartsRouter)

module.exports = router