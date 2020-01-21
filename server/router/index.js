const router = require('express').Router()
const User = require('./user')
const Products = require('./product')

router.use('/users', User)
router.use('/products', Products)

module.exports = router