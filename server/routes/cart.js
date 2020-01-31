'use strict';
const router = require('express').Router();
const controller = require('../controllers/cart');
const authentication = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');

router.patch('/checkout/:customerId', controller.changeToCheckout);
router.patch('/delivered/:customerId', controller.changeToDelivered);
router.use(authentication);
router.get('/orderlist', controller.getOrderList);
router.get('/', controller.getMyCart);
router.post('/', controller.addToCart);
// router.delete('/item/:id', controller.removeItem);
router.delete('/:id', controller.removeCart);


module.exports = router;