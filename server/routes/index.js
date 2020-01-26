const express = require('express');
const router = express.Router();

const users = require('./users')
const auths = require('./auths.js')
const products = require('./products')
const carts = require('./carts')
router.use('/users', users)
router.use('/auth', auths)
router.use('/products', products)
router.use('/carts', carts)
module.exports = router;
