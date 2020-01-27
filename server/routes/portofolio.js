'use strict'

const express = require('express');
const routes = express.Router();
const PortofolioController = require('../controllers/PortofolioController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const upload = require('../middleware/uploadImage');

routes.get('/', PortofolioController.read);

routes.use(authentication);

routes.use(authorization);

routes.post('/', upload.single('file'), PortofolioController.create);

module.exports = routes;