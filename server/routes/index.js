const express = require('express')
const router = express.Router()

// routes list
const user = require('./user');
const product = require('./product');
const cart = require('./cart');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', function (req, res, next) {
    res.send('TOOKOO API IS ALIVE')
})
// middleware that is specific to this router
router.use('/users', user)
router.use('/products', product)
// router.use('/carts', cart)

router.use(errorHandler)

module.exports = router