const router = require('express').Router()

router.use('/cart', require('./cartRoute'))
router.use('/product', require('./productsRoutes'))
router.use('/user', require('./userRoutes'))

module.exports = router