'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'name is required'],
        minLength: 4
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is requires'],
        minLength: 8,
        maxlength: 16
    },
    role: {
        type: String,
    }
})

userSchema.pre('save', function(){
    if(this.role.length === null){
        this.role = 'member'
        next()
    }
})

module.exports = mongoose.model('User', userSchema)