const {model, models, Schema} = require('mongoose')
const pass = require('../helper/hash')

const UserSchema = new Schema({
    first_name: {
        type : String,
        required: [true, 'Please input your first name']
    },
    last_name:{
        type: String,
        required: [true, 'Please input your last name']
    },
    email:{
        type: String,
        required: [true, 'Please input your email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please input your password']
    },
    admin:{
        type: Boolean,
    },
    address:{
        type: String,
        required: [true, 'Please input your address']
    }
})

UserSchema.pre('save', function(next){
    pass.hash(this.password)
    .then((data)=>{
        this.password = data
        next()
    })
})


const User = model('User', UserSchema)


module.exports = User