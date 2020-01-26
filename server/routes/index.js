'use strict'

const express = require('express')
const router = express.Router()
const user = require('./users')
const product = require('./products')
const cart = require('./carts')
const Authentication = require('../middlewares/authentication')

router.use('/users', user)
router.use('/products', product)
router.use('/carts', Authentication, cart)

module.exports = router