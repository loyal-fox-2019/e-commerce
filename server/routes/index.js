const router = require('express').Router();
const user = require('./userRoute.js');
const product = require('./productRoute.js');
const transaction = require('./transactionRoute');
const authenticator = require('../middlewares/authenticator');

router.use('/user', user)
router.use(authenticator)
router.use('/product', product)
router.use('/transaction',transaction)

module.exports = router
