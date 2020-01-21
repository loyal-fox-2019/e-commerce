const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator: function(value) {
        return User.findOne({ username: value }).then(user => {
          if (user) return false;
        });
      },
      message: props => 'Username already used'
    }
  },
  profile_pic: {
    type: String,
    default: 'https://image.flaticon.com/icons/svg/2427/2427293.svg'
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
    validate: {
      validator: function(value) {
        return User.findOne({ email: value }).then(user => {
          if (user) return false;
        });
      },
      message: props => 'Email already registered'
    }
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'minimal password length is 6']
  },
  admin: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', function(next) {
  this.password = hash(this.password)
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
