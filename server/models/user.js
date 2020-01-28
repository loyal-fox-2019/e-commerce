'use strict';

const mongoose = require('mongoose');
const bcrypt = require('../helper/bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'username is required']
	},
	email: {
		type: String,
		required: [true, 'email is equired'],
		match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
		validate: {
			validator: function (value) {
				return User.findOne({ email: value }).then((user) => {
					if (user) {
						return false;
					} else {
						return true;
					}
				});
			},
			message: 'email already used'
		}
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		minlength: [6, 'minimum password is 6']
	},
	cart: {
		type: []
	},
	role: {
		type: String
	}
});

userSchema.pre('save', function () {
	let oldPassword = this.get('password');
	let newPassword = bcrypt.hashPassword(oldPassword);
	this.set({ password: newPassword });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
