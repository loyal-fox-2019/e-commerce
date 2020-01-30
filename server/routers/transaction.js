const router = require('express').Router();
const transactionController = require('../controller/transaction');
const checkToken = require('../middleware/checkToken');
const {authorizationTransaction} = require('../middleware/authorization');

router.use(checkToken);

router.post(
    '/checkout',
    authorizationTransaction,
    transactionController.checkoutCart
);
router.patch(
    '/:status/:id',
    authorizationTransaction,
    transactionController.updateStatus
);
router.get(
    '/purchased',
    authorizationTransaction,
    transactionController.getTransactionsPurchase
);
router.get(
    '/sells',
    authorizationTransaction,
    transactionController.getTransactionsSelling
);

module.exports = router;