const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username harus diisi'],
    unique: [true, 'Username atau email sudah ada']
  },
  firstname: {
    type: String,
    required: [true, 'Firstname tidak boleh kosong']
  },
  lastname: {
    type: String
  },
  contact: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi'],
    validate: {
      validator(email) {
        return new Promise((res, rej) => {
          User.findOne({ email: email, platform: this.platform })
            .then(user => {
              if (user) {
                res(false)
              } else {
                res(true)
              }
            })
            .catch(err => {
              res(false)
            })
        })
      },
      message: 'email is not available or already taken'
    }
  },
  platform: {
    type: String,
    enum: ['google', 'normal'],
    required: [true, "jenis platform harus 'google' atau 'normal'"]
  },
  password: {
    type: String,
    minlength: [6, 'Password minimal 6 karakter']
  }
})

userSchema.pre('save', function(next) {
  const bcrypt = require('bcrypt')
  const salt = bcrypt.genSaltSync(8)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User
