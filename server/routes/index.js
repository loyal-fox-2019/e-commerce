const express = require('express')
const router = express.Router()
const userRoute = require('../routes/user')
const itemRoute = require('./item')
const cartRoute = require('./cart')

router.use('/users', userRoute)
router.use('/items', itemRoute)
router.use('/carts', cartRoute)

module.exports = router