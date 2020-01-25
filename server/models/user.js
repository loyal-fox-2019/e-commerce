const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../helpers/hashPassword');

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Name required'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    validate: {
      validator: function (value) {
        return this.model("Users")
          .findOne({
            email: value
          })
          .then(email => {
            if (email) {
              return false;
            }
          });
      },
      message: props => `Email ${props.value} already taken`
    }
  },
  username: {
    type: String,
    required: [true, 'Username required'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  profilePicture: {
    type: String
  }
});

userSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next();
});

const user = mongoose.model('Users', userSchema);

module.exports = user;