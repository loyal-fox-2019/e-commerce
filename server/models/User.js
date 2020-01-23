const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt.js')
const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'fullname is required']
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'fullname is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'fullname is required'],
  },
  role: {
    type: String,
    enum: ['Costumer', 'Admin'],
    required: [true, 'role is required'],
  }
})

userSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports  = User