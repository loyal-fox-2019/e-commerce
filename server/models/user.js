const {model, Schema} = require('mongoose')
const { hashPassword } = require('../helpers/hashPassword')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Min length is 6 char']
    },
    role: {
        type: String,
    }
})

userSchema.pre('save', function(next) {
    const hash = hashPassword(this.password)
    this.password = hash
    if(this.email === 'admin@mail.com'){
        this.role = 'admin'
    }
    next()
})

const User = model('User', userSchema)

module.exports = User