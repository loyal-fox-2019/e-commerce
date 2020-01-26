"use strict"
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'please fill email'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email'],
        validate: {
            validator: function (v) {
                return mongoose.models.User.findOne({ email: v })
                    .then((result) => {
                        if (result) {
                            return false
                        } else {
                            return true
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            message: "Email address already registered"
        }
    },
    password: {
        type: String,
        minlength: [6, "Min password 6"],
        required: [true, 'please fill password']
    },
    username: {
        type: String,
        maxlength: [10, "Max username 10"],
        required: [true, 'please fill username']
    },
    phone: {
        type: String,
        maxlength: [13, "Max phone number 13"],
        minlength: [10, "Min phone number 10"],
        required: [true, 'please fill phone']
    },
    role: {
        type: String,
        default: 'customer'
    },
    cartList: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number
        }
    }]
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hashPassword(this.password)
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User