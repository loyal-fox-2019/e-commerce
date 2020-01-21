const express = require('express');
const { CartController } = require('../controllers');

const router = express.Router();

// create
router.post('/');

// read all
router.get('/');

// read one
router.get('/:cartId');

// update
router.put('/:cartId');

// delete
router.delete('/:cartId');

module.exports = router;
