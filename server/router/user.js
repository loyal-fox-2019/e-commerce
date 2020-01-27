const router = require('express').Router()
const controllerUser = require('../controllers/user')

router.get('/', controllerUser.readAllUser)

router.post('/login', controllerUser.login)

router.post('/register', controllerUser.register)

router.post('/google', controllerUser.googleSignIn)

router.delete('/:id', controllerUser.hapus)

module.exports = router