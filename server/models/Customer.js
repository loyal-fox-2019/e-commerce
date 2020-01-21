'use strict';
const mongoose = require('mongoose');
const { hash } = require('../helpers/bcryptjs');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Fullname cannot be blank'],
  },
  email: {
    type: String,
    required: [true, 'Email cannot be blank'],
    validate: {
      validator: function(value) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
          value
        );
      },
      msg: "Please enter correct email address"
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
    minlength: [8, 'Your password should be around 8 - 12 characters'],
    maxlength: [12, 'Your password should be around 8 - 12 characters']
  },
});

CustomerSchema.pre('save', function(next) {
  let user = this;
  const hashedPassword = hash(user.password);
  user.password = hashedPassword;
  next();
})

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
