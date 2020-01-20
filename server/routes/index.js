'use strict';
const router = require('express').Router();
const user = require('./user');

router.get('/test', (req, res) => res.status(200).json({ message: 'oke :)' }));
router.use('/user', user);

module.exports = router;