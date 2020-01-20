'use strict';
const router = require('express').Router();
const controller = require('../controllers/product');

router.post('/', controller.addProduct);
router.patch('/:id/stock/add', controller.addStock);
router.patch('/:id/stock/subtract', controller.removeStock);
router.delete('/:id', controller.removeProduct);

module.exports = router;