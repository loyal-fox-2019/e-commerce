'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required'],
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Not a valid Email Format'],
        validate: [{
            validator: function (v) {
                return mongoose.model('User', userSchema).findOne({
                    _id: { $ne: this._id },
                    email: v
                })
                    .then(data => { if (data) { return false } })
            },
            message: 'Email already exists'
        },
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required']

    },
    role: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User