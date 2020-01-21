'use strict';
const router = require('express').Router();
const controller = require('../controllers/product');
const authentication = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', controller.getSkins)
router.get('/search', controller.findSkins);
router.use(authentication);
router.use(isAdmin);
router.post('/', controller.addProduct);
router.patch('/:id/stock/add', controller.addStock);
router.patch('/:id/stock/subtract', controller.removeStock);
router.delete('/:id', controller.removeProduct);

module.exports = router;
