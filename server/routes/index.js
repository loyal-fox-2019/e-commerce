const express = require('express');
const router = express.Router();
const auths = require('./auths')
const products = require('./products')
const carts = require('./carts')

router.use('/auth', auths)
router.use('/products', products)
router.use('/carts', carts)
module.exports = router;