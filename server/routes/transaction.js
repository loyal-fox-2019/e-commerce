const express = require('express');
const { TransactionController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.use(authentication);

// create
router.post('/', TransactionController.create);

// read all
router.get('/', TransactionController.readAll);

// read one
router.get('/:transactionId', TransactionController.readOne);

// update
router.put('/:transactionId', TransactionController.update);

// delete
router.delete('/:transactionId', TransactionController.delete);

module.exports = router;
