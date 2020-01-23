const express = require('express');
const router = express.Router();

const auths = require('./auths.js')
const products = require('./products')
router.use('/auth', auths)
router.use('/products', products)
module.exports = router;
