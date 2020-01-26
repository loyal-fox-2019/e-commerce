const {Schema, model} = require('mongoose')

const productSchema = new Schema ({
  name : {
    type : String,
    required: [true, 'Product name cannot be empty'],
  },
  image : {
    type : String
  },
  price : {
    type : Number,
    required: [true, 'Price cannot be empty'],
    validate : {
      validator : function(val) {
        return val < 0 ? false : true 
      },
        message: 'Price cannot be negative value'
      }
  },
  stock : {
    type : Number,
    default: 0,
    validate : {
      validator : function(val) {
          return val < 0 ? false : true
      },
      message: 'Stock cannot be negative value'
    }
  },
  owner : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
},
{
  timestamps: true
})

const Product = model('Product', productSchema)
module.exports = Product