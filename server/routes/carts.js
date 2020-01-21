const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController')
const authentication = require('../middlewares/authentication')
router.post('/', authentication, CartController.create)
router.delete('/:id', authentication, CartController.delete)

module.exports = router;
