'use strict';

const router = require('express').Router();
const CartController = require('../controllers/CartController');
const { authentication, authorization } = require('../middlewares/auth');

router.use(authentication);

router.get('/', CartController.find);
router.post('/', CartController.create);
router.delete('/', CartController.deleteMany);

router.delete('/:id', authorization, CartController.deleteOne);

module.exports = router;