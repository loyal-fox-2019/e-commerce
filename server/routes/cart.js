const express = require('express');
const { CartController } = require('../controllers');

const router = express.Router();

// create
router.post('/', CartController.create);

// read all
router.get('/', CartController.readAll);

// read one
router.get('/:cartId', CartController.readOne);

// update
router.put('/:cartId', CartController.update);

// delete
router.delete('/:cartId', CartController.delete);

module.exports = router;
