const router = require('express').Router()
const User = require('../models/user')
const {GenerateToken} = require('../helpers/jwt')
const {compare} = require('../helpers/encryption')
const Cart = require('../models/cart')
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)

router.post('/login', UserController.login)


module.exports = router