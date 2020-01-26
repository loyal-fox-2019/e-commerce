const express = require('express');
const { CartController } = require('../controllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.use(authentication);

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
