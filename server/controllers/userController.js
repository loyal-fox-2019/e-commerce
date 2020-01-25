const User = require('../models/user')
const { comparePassword } = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')

class UserController {
    static register (req, res, next) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'basic'
        }

        User.create(data)
            .then(result => {
                res.status(201).json({
                    message: 'User created',
                    result
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Please check your data'
                })
            })
    }

    static login (req, res, next) {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        // console.log(req.body)
        
        User.findOne({email: data.email})
            .then(result => {
                if (!result) {
                    res.status(404).json({
                        message: 'Please register your account first'
                    })
                }else {
                    const compare = comparePassword(data.password, result.password)
                    if (!compare) {
                        res.status(400).json({
                            message: 'Invalid email or password'
                        })
                    }else {
                        const token = jwt.sign({
                            id: result._id,
                            email: result.email
                        }, process.env.JWT_SECRET)
                        res.status(200).json({
                            message: 'Login success',
                            name: `${result.name}`,
                            token: token
                        })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            }) 

    }

    static registerAdmin (req, res, next) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'admin'
        }

        User.create(data)
            .then(result => {
                res.status(201).json({
                    message: 'Admin created',
                    result
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Please check your data'
                })
            })
    }
}

module.exports = UserController
