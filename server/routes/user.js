const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

// register
router.post('/register', UserController.register);

// login
router.post('/login', UserController.login);

module.exports = router;
