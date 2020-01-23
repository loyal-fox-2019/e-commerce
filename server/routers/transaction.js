const router = require('express').Router();
const transactionController = require('../controller/transaction');
const checkToken = require('../middleware/checkToken');

router.use(checkToken);

router.post('/checkout', transactionController.checkoutCart);
router.patch('/done/:id', transactionController.updateStatus);
router.get('/purchased', transactionController.getTransactionsPurchase);

module.exports = router;