'use strict';

const express = require('express');
const routes = express.Router();
const ProductController = require('../controllers/ProductController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const upload = require('../middleware/uploadImage');

routes.get('/', ProductController.read);

routes.get('/:id', ProductController.readOne)

routes.use(authentication);

routes.use(authorization);

routes.post('/', upload.single('file'), ProductController.create);

routes.put('/:id', ProductController.update);

routes.delete('/:id', ProductController.delete)

module.exports = routes