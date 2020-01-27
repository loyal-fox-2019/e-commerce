const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'Input name']
    },
    email: {
        type: String,
        required: [true,'Input email'],
        unique: [true,'Email has been used'],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: props => `${props.value} is not a valid email format`
        }
    },
    password: {
        type: String,
        required: [true,'Input password']
    },
    cart: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        }
    }],
    role: {
        type:String
    }
})

userSchema.pre('save', function () {
    this.password = hashPassword(this.password)
})

const User = mongoose.model('User', userSchema)

module.exports = User