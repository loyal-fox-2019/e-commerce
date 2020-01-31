'use strict'

const router = require('express').Router(),
      UserController = require('../controllers/userController')

router.get('/', UserController.findCart)
router.post('/', UserController.addToCart)
router.patch('/', UserController.removeFromCart)
// router.delete('/', UserController.emptyCart)

module.exports = router;