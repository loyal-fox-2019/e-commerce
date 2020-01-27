'use strict';

const router = require('express').Router();
const CartRouter = require('./CartRouter');

router.use('/cart', CartRouter);

module.exports = router;