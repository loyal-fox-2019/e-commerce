const express = require('express')
const router = express.Router()
const inventory_router = require('../router/inventory-router')
const user_router = require('../router/user-router')
const cart_router = require('../router/cart-router')
const errorhandle = require('../middleware/errorhandle')

router.use('/inventories', inventory_router)
router.use('/users', user_router)
router.use('/carts', cart_router)
router.use(errorhandle.errors)




module.exports = router