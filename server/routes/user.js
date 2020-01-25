const express = require('express')
const router = express.Router()
const userController = require('../controllers/user');

// define the home page route
router.get('/', userController.isEmailUnique)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/oauth', userController.oauthLogin)

module.exports = router