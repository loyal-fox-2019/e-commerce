const router = require('express').Router()
const userR = require('./user')
const productR = require('./product')
const cartR = require('./cart')

router.use('/users', userR)
router.use('/products', productR)
router.use('/carts', cartR)

module.exports = router