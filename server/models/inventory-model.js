const {Schema, model, models} = require('mongoose')

// {name, stock, description, category, image file}
const InventorySchema = new Schema({
    name: {type: String, required:[true, 'Please input name']},
    stock: {type: Number,required:[true, 'Please input stock']},
    description: {type: String, required:[true, 'Please input description']},
    category: {type: String, required:[true, 'Please input category']},
    price:{type: Number, required:[true, 'Please input stock']},
    image: {type: String},
    admin: {type: Schema.Types.ObjectId, ref: 'User'}
})


const Inventory = model('Inventory', InventorySchema)


module.exports = Inventory