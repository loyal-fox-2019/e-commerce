const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hash = require('../helpers/bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    profpic: {
        type: String,
        default: "https://storage.cloud.google.com/e-commerce-image/user_icon.png?supportedpurview=project"
    },
    cart: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                min: 1
            }
        }
    ],
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
        validate: {
            validator(email) {
                return User.findOne({
                    email
                })
                .then(user=>{
                    if(user){
                        return false
                    }
                    else {
                        return true
                    }
                })
            },
            message: 'Email already registered'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum password length 6 character']
    }
})

userSchema.pre("save", function(next){
    let hashedPass = hash(this.password)
    this.password = hashedPass
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User