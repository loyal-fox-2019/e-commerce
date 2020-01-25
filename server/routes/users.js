const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/gcsupload')
const googleAuth = require('../middlewares/googleAuth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/glogin/:id_token', googleAuth, UserController.glogin)
router.get('/', authentication, UserController.getUserData)
router.patch('/profpic', authentication, upload.single('profpic'), UserController.addPic)
router.patch('/addCart', authentication, UserController.addCart)
router.patch('/edit-cart', authentication, UserController.replaceCart)
router.patch('/remove-item', authentication, UserController.removeCart)
router.patch('/checkout', authentication, UserController.checkout)

module.exports = router