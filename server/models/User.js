const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt.js')
const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Full Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['Client','Seller', 'Admin'],
    required: [true, 'role is required'],
  },
  address: {
    type: String,
  },
  phone: {
    type: Number
  }
})

userSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports  = User