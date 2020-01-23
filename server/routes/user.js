'use strict';
const router = require('express').Router();
const controller = require('../controllers/user');

router.post('/', controller.login);
router.post('/register', controller.register);
router.post('/google-auth', controller.googleLogin);

module.exports = router;
