const { model, Schema } = require('mongoose')
const { hashPassword } = require('../helpers/hashPassword')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email has been registered'],
    validate: [
      {
        validator: function(value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        message: 'Invalid email format'
      }
    ]
  },
  password: {
    type: String,
    required: true, 
    minlength: [6, 'Min length is 6 char']
  },
  role: {
    type: String
  }
})

userSchema.pre('save', function(next) {
  const hash = hashPassword(this.password)
  this.password = hash
  if (this.email === 'admin@mail.com') {
    this.role = 'admin'
  }
  next()
})

const User = model('User', userSchema)

module.exports = User
