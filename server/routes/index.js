const express = require('express');
const router = express.Router();

const users = require('./users')
const auths = require('./auths.js')
const products = require('./products')
const carts = require('./carts')
const transactions = require('./transactions')
router.use('/users', users)
router.use('/auth', auths)
router.use('/products', products)
router.use('/carts', carts)
router.use('/transactions', transactions)
module.exports = router;
