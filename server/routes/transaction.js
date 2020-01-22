const express = require('express');
const { TransactionController } = require('../controllers');

const router = express.Router();

// create
router.post('/', TransactionController.create);

// read all
router.get('/', TransactionController.readAll);

// read one
router.get('/:cartId', TransactionController.readOne);

// update
router.put('/:cartId', TransactionController.update);

// delete
router.delete('/:cartId', TransactionController.delete);

module.exports = router;
