const User = require('../models/User')
const jwt  = require('jsonwebtoken')
class AuthController{
	static register(req, res, next){
		User
			.create({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			})
			.then(user => {
				const token = jwt.sign({
					userId: user._id,
					username: user.username
				}, process.env.JWT_SECRET)
				res.status(200).json({
					token
				})
			})
			.catch(next)
	}

	static login(req, res, next){
		const form = req.body
		User
			.findOne({
				username: form.username
			})
			.then(user => {
                const error = {
                    name: 'ValidationError',
                    message: 'username/password incorrect'
                }
                if (user) {
                    const isPassword = form.password === user.password
                    if (isPassword) {
                        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET )
                        res.status(200).json({
                            token
                        })
                    }else{
                        throw error
                    }
                }else{
                    throw error
                }
            })
			.catch(next)
	}
}

module.exports = AuthController
