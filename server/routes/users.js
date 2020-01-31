'use strict'

const router = require('express').Router(),
      UserController = require('../controllers/userController'),
      { authentication, userAuthorization } = require('../middlewares/auth'),
      { multer, sendUploadToGCS } = require("../middlewares/gcs");

router.post('/register', UserController.register)
router.post('/signin', UserController.signin)
router.post('/googleSignIn', UserController.googleSignIn)

router.use(authentication)
router.get('/:id', UserController.findOne)
router.put('/:id',
  userAuthorization,
  multer.single("image"),
  sendUploadToGCS,
UserController.edit)

module.exports = router;