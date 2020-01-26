'use strict'

const express = require('express')
const router = express.Router()
const user = require('./users')
const product = require('./products')
const cart = require('./carts')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.use('/users', user)
router.use(Authentication)
router.use('/carts', cart)
router.use('/products', Authorization, product)

module.exports = router