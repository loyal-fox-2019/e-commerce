'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const productController = require('../controllers/productController');

router.post('/create', productController.create)
router.use(auth.authenticate)
router.get('/', productController.findAll)

router.patch('/:id', productController.minusStock)


module.exports = router;
