'use strict';
const router = require('express').Router();
const controller = require('../controllers/cart');
const authentication = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');

router.use(authentication);
router.get('/', controller.getMyCart);
router.post('/', controller.addToCart);
router.patch('/checkout/:customerId', controller.changeToCheckout);
router.patch('/delivered/:customerId', controller.changeToDelivered);
router.get('/orderlist', isAdmin, controller.getOrderList);


module.exports = router;