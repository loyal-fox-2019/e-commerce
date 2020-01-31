const {model, models, Schema} = require('mongoose')

const CartSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Please input login first']

    },
    inventory:{
        type: Schema.Types.ObjectId, 
        ref: 'Inventory',
        required: [true, 'Please input inventory id']
    },
    amount:{type: Number},
    date_add: {type: Date}
})
CartSchema.pre('remove',{query: true, document: true},function (next){
    models.Cart.findById(this._conditions._id)
    .then((data)=>{
        let input = {
            cartId: data._id,
            inventoryId: data.inventory,
            userId: data.user,
            amount: data.amount,
            date_add: data.date_add,
            date_checkout: new Date ()
        }
        models.Inventory.findById(data.inventory)
        .then((data)=>{
            if(data.stock > input.amount){
                let tm = data.stock - input.amount
                models.Inventory.updateOne({_id: input.inventoryId}, {stock: tm})
                .then((data)=>{
                    next()
                })
            }
            else{
                next(new Error('out of stock'))
            }
        })
    })
})

CartSchema.pre('save', function(next){
   next()
})

const Cart = model('Cart', CartSchema)


module.exports = Cart