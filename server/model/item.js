const {model, models, Schema} = require('mongoose');

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "item name min length 3 character"],
        maxlength: [50, "item name max length 50 character"],
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    image: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: [true, "description required"],
        minlength: [15, "item name min length 15 character"],
        maxlength: [500, "item name max length 500 character"],
    }
});

const Item = model('Item', itemSchema);

module.exports = Item;

