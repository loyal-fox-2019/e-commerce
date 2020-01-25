const router = require('express').Router()
const UserController = require('../controllers/userController')
const Authenticate = require('../middlewares/authenticate')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/register/4dm1n', UserController.registerAdmin)

module.exports = router