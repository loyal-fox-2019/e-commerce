const router = require('express').Router(),
  userRoutes = require('./user'),
  UserController = require('../controllers/user')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/users', userRoutes)

module.exports = router
