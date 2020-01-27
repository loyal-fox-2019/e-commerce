'use strict';

const User = require('../models/user');
const Jwt = require('../helper/jwt');
const Bcrypt = require('../helper/bcrypt');

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
        User.create(newUser)
        .then(user => {
            res.status(201).json({
                message: 'New user has been created',
                data: user
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static login(req, res, next) {
        User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                throw {
                    name: 'BadRequest',
                    message: 'Incorrect email or password'
                }
            } else {
                const verifyPassword = Bcrypt.verifyPassword(req.body.password, user.password);
                if(!verifyPassword) {
                    throw {
                        name: 'BadRequest',
                        message: 'Incorrect email or password'
                    }
                } else {
                    const payload = {
                        id: user._id
                    }
                    const userToken = Jwt.signToken(payload);
                    if(user.userType === 'normal') {
                        res.status(200).json({
                            message: 'Login successful',
                            data: userToken
                        })
                    } else if(user.userType === 'admin'){
                        res.status(200).json({
                            message: 'Login successful',
                            data: {userToken, type: user.userType}
                        }) 
                    }
                }
            }
        })
        .catch(error => {
            console.log('msauk'+error)
            next(error);
        })
    }
}

module.exports = UserController;