const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

router.post('/isvalid', UserController.isValid)

module.exports = router