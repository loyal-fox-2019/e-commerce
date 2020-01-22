const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Harus masukin username untuk nama toko'],
    validate: {
      validator: function(value) {
        return User.findOne({ username: value }).then(user => {
          if (user) return false;
        });
      },
      message: props => 'username sudah ada yang pakai'
    }
  },
  profile_pic: {
    type: String,
    default: 'https://image.flaticon.com/icons/svg/2427/2427293.svg'
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'harus masukkan email untuk daftar'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid'],
    validate: {
      validator: function(value) {
        return User.findOne({ email: value }).then(user => {
          if (user) return false;
        });
      },
      message: props => 'Email sudah terdaftar'
    }
  },
  password: {
    type: String,
    required: [true, 'Harus masukkan password'],
    minlength: [6, 'Panjang password minimal 6']
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
