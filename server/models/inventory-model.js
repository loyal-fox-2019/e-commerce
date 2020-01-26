const {Schema, model, models} = require('mongoose')

// {name, stock, description, category, image file}
const InventorySchema = new Schema({
    name: {type: String},
    stock: {type: Number},
    description: {type: String},
    category: {type: String},
    price:{type: Number},
    image: {type: String},
    admin: {type: Schema.Types.ObjectId, ref: 'User'}
})


const Inventory = model('Inventory', InventorySchema)


module.exports = Inventory