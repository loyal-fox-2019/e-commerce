'use strict';

const User = require('../models/user');
const bcrypt = require('../helper/bcrypt');
const jwt = require('../helper/jwt');

class UserController {
	static findAll(req, res, next) {
		User.find()
			.then((results) => {
				res.status(200).json(results);
			})
			.catch(next);
	}

	static create(req, res, next) {
		const obj = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			role: 'customer'
		};
		User.create(obj)
			.then((result) => {
				let token = jwt.generateToken(result);
				res.status(200).json({
					token
				});
			})
			.catch(next);
	}

	static delete(req, res, next) {
		User.findByIdAndDelete(req.params.id)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch(next);
	}

	static login(req, res, next) {
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					next({ message: 'email/password salah' });
				} else {
					if (!bcrypt.checkPassword(req.body.password, user.password)) {
						next({ message: 'email/password salah' });
					} else {
						let token = jwt.generateToken(user);
						res.status(200).json({
							token,
							name: user.username
						});
					}
				}
			})
			.catch(next);
	}

	static addToCart(req, res, next) {
		let currentCart = req.user.cart
		currentCart.push(req.body.card)
		User.findByIdAndUpdate(req.user._id, {
			cart: currentCart
		})
			.then(() => {
				res.status(200).json({
					message: 'success'
				});
			})
			.catch(next)
	}

	static findMe(req, res, next) {
		User.findById(req.user._id)
			.then(data => {
				res.status(200).json(data)
			})
			.catch(next)
	}

	static deleteCart(req, res, next) {
		let data = []
		req.user.cart.forEach((element, index) => {
			if (index !== req.body.index) {
				data.push(element)
			}
		});
		User.findByIdAndUpdate(req.user._id, {
			cart: data
		})
			.then(() => {
				res.status(200).json({
					message: 'success'
				});
			})
			.catch(next)
	}
}

module.exports = UserController;
