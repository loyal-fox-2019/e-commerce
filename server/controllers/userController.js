'use strict'

const userModel = require('../models/user')

const jwt = require('jsonwebtoken')
const bcyrpt = require('bcryptjs')


class UserController {
    static createNewUser(req, res, next) {
        const { name, email, password } = req.body

        const newUserData = {
            name,
            email,
            password
        }
        userModel.create(newUserData)
            .then(user => {
                const tokenPayload = {
                    userID: user.id,
                    email: user.email
                }

                const jwtToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)

                res.status(201).json({
                    message: 'user registration success',
                    user: {
                        name: user.name,
                        email: user.email
                    },
                    access_token: jwtToken
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log('masuk');
        const { email, password } = req.body

        userModel.findOne({
            email: email
        })
            .then(user => {
                if (!user || bcyrpt.compareSync(password, user.password)) {
                    const customError = new Error('LoginError')
                    customError.status = 401
                    customError.message = `invalid email & password combination!`
                }
                else {
                    const tokenPayload = {
                        userID: user.id,
                        email: user.email
                    }

                    const jwtToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)

                    res.status(200).json({
                        access_token: jwtToken
                    })
                }
            })
    }
}

module.exports = UserController