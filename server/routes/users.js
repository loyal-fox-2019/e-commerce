const express = require('express')
const router = express.Router()
const User = require('../controllers/userController')
const auth = require('../middlewares/auth')

/* GET users listing. */
router.post('/register', User.register)
router.post('/login', User.login)
router.get('/', auth.authentication, User.getUser)
router.post('/logout', auth.authentication, User.logout)
module.exports = router
