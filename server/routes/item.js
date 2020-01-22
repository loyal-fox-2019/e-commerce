const express = require('express');
const { ItemController } = require('../controllers');

const router = express.Router();

// create
router.post('/', ItemController.create);

// read all
router.get('/', ItemController.readAll);

// read one
router.get('/:cartId', ItemController.readOne);

// update
router.put('/:cartId', ItemController.update);

// delete
router.delete('/:cartId', ItemController.delete);

module.exports = router;
