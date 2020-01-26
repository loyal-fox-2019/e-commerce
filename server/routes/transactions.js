const express = require('express');
const router = express.Router();
const Authentication = require('../middlewares/Authentication')
const TransactionController = require('../controllers/TransactionController')

router.post('/', Authentication, TransactionController.create)
router.get('/', Authentication, TransactionController.getAll)
router.get('/costumer', Authentication, TransactionController.getByCostumer)
module.exports = router