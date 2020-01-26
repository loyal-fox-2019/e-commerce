const router = require('express').Router()
const usersRouter = require('./users')
const productsRouter = require('./products')
const cartRouter = require('./carts')

router.use('/', usersRouter)
router.use('/products', productsRouter)
router.use('/cart', cartRouter)

module.exports  = router