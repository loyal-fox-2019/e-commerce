const express = require('express')
const router = express.Router()
const UserCtr = require('../controllers/user')

router.use('/register', UserCtr.register)
router.use('/login', UserCtr.login)

module.exports = router