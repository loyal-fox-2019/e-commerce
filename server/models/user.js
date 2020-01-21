const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});

userSchema.pre('save', function(next) {
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
