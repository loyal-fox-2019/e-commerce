const router = require('express').Router()
const UserRoutes = require('./user')
const ItemRoutes = require('./item')
const CartRoutes = require('./cart')

router.use('/user', UserRoutes)
router.use('/item', ItemRoutes)
router.use('/cart', CartRoutes)

module.exports = router