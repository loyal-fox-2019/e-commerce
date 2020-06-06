'use strict';

const mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: {
            validator: function(email) {
                return User.findOne({
                    email
                })
                .then(user => {
                    if(user) {
                        return false;
                    } else {
                        return true;
                    }
                })
                .catch(err => {
                    console.log('Validator error: ' +err);
                });
            },
            message: 'Email already exist'
        }
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    this.password = bcrypt.generateHash(this.password);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
