const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hash} = require('../helpers/encryption')

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, 'Username is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is not valid'],
        validate: {
            validator: function (v) {
                User.findOne({ email: v })
                    .then((user) => {
                        if(user){
                            return false
                        }else{
                            return true
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},{timestamps: true})

userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User