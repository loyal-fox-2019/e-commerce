'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require('../helper/bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field cannot be empty'],
        validate: {
            validator: function(value) {
                return User.findOne({email: value})
                .then(user => {
                    if(user) {
                        return false;
                    } else {
                        return true;
                    }
                })
            },
            message: 'Email must be unique'
        }
    },
    name: {
        type: String,
        required: [true, 'Name field cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'Password field cannot be empty']
    },
    userType: {
        type: String,
        default: 'normal'
    }
})

userSchema.pre('save', function(next) {
    this.password = Bcrypt.hashPassword(this.password);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;