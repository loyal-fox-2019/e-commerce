const router = require('express').Router()
const UserController = require('../controllers/user-controller')

router.get('/', function(req, res, next) {
  console.log('masuk ke sini')
  res.json({ message: 'Server alive!' })
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router
