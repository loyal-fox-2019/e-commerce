'use strict';

const router = require('express').Router();
const UserController = require('../controllers/UserController');
const ProductRouter = require('./ProductRouter');
const CartRouter = require('./CartRouter');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use('/products', ProductRouter);
router.use('/carts', CartRouter);

module.exports = router;