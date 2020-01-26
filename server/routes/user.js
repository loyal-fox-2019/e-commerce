const express = require('express');
const { UserController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

// register
router.post('/register', UserController.register);

// signin
router.post('/signin', UserController.signIn);

// get current user profile
router.get(
  '/get-curr-user-profile',
  authentication,
  UserController.getCurrUserProfile
);

module.exports = router;
