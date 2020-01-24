const transactionCon = require('../controllers/transactionController');
const router = require('express').Router();
const adminAuthorizer = require('../middlewares/adminAuthorizer');

router.post('/', transactionCon.checkout)
router.use(adminAuthorizer)
router.get('/', transactionCon.findAll)
router.get('/:_id', transactionCon.findOne)
router.put('/:_id', transactionCon.update)
router.delete('/_id', transactionCon.delete)


module.exports = router