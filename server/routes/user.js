"use strict"

const router = require('express').Router()
const userController = require('../controllers/User')
const authenticate = require('../middlewares/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use(authenticate)
router.patch('/carts', userController.addCart)
router.get('/carts', userController.findCart)
router.delete('/carts', userController.deleteCart)

module.exports = router