const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    validate: {
      validator (username) {
        return User
          .findOne({ username })
          .then((user) => {
            if (user) {
              return false
            } else {
              return true
            }
          })
          .catch(() => {
            return false
          })
      },
      message () {
        return 'Username is used'
      }
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [{
      validator (email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailRegex.test(email.toLowerCase())
      },
      message () {
        return 'Email is not valid'
      }
    }, {
      validator (email) {
        return User
          .findOne({ email })
          .then((user) => {
            if (user) {
              return false
            } else {
              return true
            }
          })
          .catch(() => {
            return false
          })
      },
      message () {
        return 'Email is used'
      }
    }]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password is too short']
  },
  cart: [{
    _id: false,
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number
    }
  }],
  role: {
    type: String
  }
}, {
  timestamps: true
})

userSchema.pre('save', function (next) {
  this.password = hash(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
