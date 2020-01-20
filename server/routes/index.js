'use strict';
const router = require('express').Router();
const user = require('./user');
const product = require('./product');
const cart = require('./cart');

router.get('/test', (req, res) => res.status(200).json({ message: 'oke :)' }));
router.use('/user', user);
router.use('/products', product);
router.use('/carts', cart);

module.exports = router;