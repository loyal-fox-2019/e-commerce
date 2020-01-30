'use strict';

const express = require('express');
const routes = express.Router();
const CartController = require('../controllers/CartController');
const authentication = require('../middleware/authentication');
const cartAuthorization = require('../middleware/cartAuthorization');

routes.use(authentication);

routes.get('/', CartController.read)

routes.post('/', CartController.create);

routes.delete('/:id', cartAuthorization, CartController.delete);

module.exports = routes;