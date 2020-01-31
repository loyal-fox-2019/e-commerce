const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/user-controller')
const errorHandle = require('../middleware/errorhandle')
const verif = require ('../middleware/verification')

router.post('/signup', user_controller.signup)
router.post('/signup/admin',verif.authenAdmin,user_controller.signupadmin)
router.post('/signin', user_controller.signin)
router.post('/admin', user_controller.signinadmin)

router.use(errorHandle.errors)


module.exports = router