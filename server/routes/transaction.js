const express = require('express')
const route = express.Router()
const TransactionCon = require('../controllers/TransactionCon')
const {transactionAuthorize} = require('../midllewares/transactionAuth')


//find all
route.get('/',TransactionCon.findAll)

//find one
route.get('/:id',TransactionCon.findOne)

//create
route.post('/', TransactionCon.create)


//delete one
route.delete('/:id', transactionAuthorize ,TransactionCon.remove)

//update status delivered
route.patch('/:id', transactionAuthorize ,TransactionCon.updateStatus)

module.exports = route