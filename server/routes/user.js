const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')
const authenticate = require('../middlewares/authenticate')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authenticate)
router.get('/cart', UserController.getUserCart)
router.post('/cart', UserController.addToCart)
router.delete('/cart', UserController.removeFromCart)

module.exports = router
