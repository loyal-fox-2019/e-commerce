const router = require('express').Router()
const UserController = require('../controllers/userController')
const Authenticate = require('../middlewares/authenticate')

router.use('/login', UserController.login)
router.use('/register', UserController.register)

module.exports = router