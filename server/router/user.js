'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')
const userController = require('../controllers/userController');

router.get('/', userController.findAll);
router.post('/register', userController.create);
router.post('/login', userController.login);
router.delete('/:id', userController.delete);

router.use(auth.authenticate)
router.patch('/addToCart', userController.addToCart)
router.get('/cart', userController.findMe)
router.patch('/deleteCart', userController.deleteCart)

module.exports = router;
