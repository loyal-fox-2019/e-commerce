const express = require('express');
const router = express.Router();
const Authentication = require('../middlewares/Authentication')
const CartController = require('../controllers/CartController')

router.use('/', Authentication)
router.get('/', CartController.getAll)
router.post('/', CartController.create)
router.get('/:id', CartController.get)
router.patch('/amount/:id', CartController.updateAmount)
router.delete('/:id', CartController.delete)

module.exports = router;
