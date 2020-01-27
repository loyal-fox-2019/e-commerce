'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')

class userController {
    static register(req, res, next) {
        const obj = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        User.create(obj)
        .then(result => {
            if(!result) {
                throw ({status: 400, message: 'bad request'})
            }
            else {
                res.status(200).json(result)
            }
        })
        .catch(next)
    }
    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
        .then(result => {
            if(!result){
                throw {status: 404, message: 'username/email is wrong'}
            }
            else if(result.password !== req.body.password){
                throw {status: 404, message: 'username/email is wrong'}
            }
            else {
                const token = jwt.sign(result.id, process.env.JWT_KEY)
                res.status(200).json({jwt_token: token})
            }
        })
        .catch(next)
    }
}   

module.exports = userController