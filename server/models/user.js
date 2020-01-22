const mongoose = require('mongoose')
const { Schema } = mongoose
const hashPassword = require('../helpers/bcryptHash')

const userSchema = new Schema({
    name : {
        type: String
    },
    email : {
        type: String
    },
    password : {
        type: String
    },
    address : {
        type: String
    },
    admin : {
        type: Boolean
    }
})

userSchema.pre('save', function(){
    return hashPassword(this.password)
    .then(hashedPassword=>{
        this.password = hashedPassword
    })
    .catch(err=>{
        throw new Error('Register Failed')
    })
})

const user = mongoose.model('Users', userSchema)

module.exports = user