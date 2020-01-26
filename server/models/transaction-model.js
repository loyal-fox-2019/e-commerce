const {Schema, model, models} = require('mongoose')

const TransactionSchema = new Schema ({
    cartId:{type: String},
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'User'},
    inventoryId: {
        type: Schema.Types.ObjectId, 
        ref: 'Inventory'},
    amount:{type:Number},
    date_add: {type: Date},
    date_checkout: {type:Date},
    delivery: {type: Boolean}
})

const Transaction = model('Transaction', TransactionSchema)


module.exports = Transaction


