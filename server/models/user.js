const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  imageUrl: {
    type: String,
    default: 'https://img.icons8.com/officel/2x/user.png',
    required: [true, 'image is required']
  },
  role: {
    type: String,
    default: 'customer',
    required: true
  },
  balance: {
    type: Number,
    required: [true, 'money is required']
  }
})

module.exports = mongoose.model('User', userSchema)
