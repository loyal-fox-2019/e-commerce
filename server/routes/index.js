'use strict';

const express = require('express');
const routes = express.Router();
const user = require('./user');
const product = require('./product');
const cart = require('./cart');
const portofolio = require('./portofolio');

routes.use('/user', user);

routes.use('/product', product);

routes.use('/cart', cart);

routes.use('/portofolio', portofolio);

module.exports = routes;