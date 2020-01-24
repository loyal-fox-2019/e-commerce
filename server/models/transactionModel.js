const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    buyer : String,
    products: Array,
    bought_at : Date
});
// Compile model from schema
const TransactionModel = mongoose.model('Transaction', transactionSchema );

module.exports = TransactionModel