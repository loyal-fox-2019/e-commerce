const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { generateHash } = require('../helper/bcryptjs')
const autoUppercase = require('../helper/autoUppercase')

const userSchema = new Schema({
    firstName:{
        type: String,
        required : [true, 'Complete registration using first name']
    },
    lastName:{
        type: String
    },
    fullName:{
        type: String
    },
    username:{
        type: String,
        unique: true,
        required: [true, 'Username must be provided']
    },
    description:{
        type: String,
        default: ' '
    },
    email:{
        type: String,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Wrong email format'],
        required: [true, 'Email must be provided'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password must be provided']
    },
    address:{
        type: String,
        required: [true, 'Address must be provided'],
        default: ' '
    },
    profilePicture:{
        type: String
    }
})

userSchema.pre('save', function(){
    this.password = generateHash( this.password )  
    this.fullName = autoUppercase(this.firstName, this.lastName)
})

userSchema.pre('findOneAndUpdate', function(next){
    //  begini juga jalan cuma bad banget codenya
    // this.getUpdate().fullName = autoUppercase(this.getUpdate().firstName, this.getUpdate().lastName)
    
    const updateQuery = this.getUpdate()
    updateQuery.fullName = autoUppercase(updateQuery.firstName, updateQuery.lastName)
    next()
})



const User = mongoose.model('User', userSchema)
module.exports = User