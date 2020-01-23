'use strict';
const router = require('express').Router();
const user = require('./user');
const product = require('./product');
const cart = require('./cart');
const order = require('../controllers/order');
const isAdmin = require('../middlewares/isAdmin')
const authentication = require('../middlewares/authentication');

router.get('/test', (req, res) => res.status(200).json({ message: 'oke :)' }));
router.get('/transactions', authentication, isAdmin, order.getList);
router.use('/user', user);
router.use('/products', product);
router.use('/carts', cart);

module.exports = router;