const mongoose = require('mongoose');
const Hash = require('../helpers/hash');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    avatar: {
      type: String
    },
    role: {
      type: String,
      default: 'customer'
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  const avatarUrl = 'https://api.adorable.io/avatars/285/';
  this.model('User')
    .findOne({ email: this.email })
    .then(user => {
      if (user) {
        const err = new Error(`Email is already registered!`);
        err.statusCode = 406;

        throw err;
      } else {
        [this.username] = this.email.split('@');
        this.password = Hash.generate(this.password);
        this.avatar = `${avatarUrl + this.username}@adorable.png`;
        next();
      }
    })
    .catch(err => next(err));
});

module.exports = mongoose.model('User', userSchema);
