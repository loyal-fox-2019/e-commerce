const User = require('../models/user')
const { hashPassword } = require('../helpers/bcrypt')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserCtr {
    static register(req, res, next) {
        const password = req.body.password
        const hashPass = hashPassword(password)

        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if(!user) {
                User.create({
                    email: req.body.email,
                    password: hashPass
                })
                .then((user) => {
                    res.status(201).json({
                        message: "register successfully!",
                        user
                    })
                })
            } else {
                res.status(400).json({
                    message: "email already registered!"
                })
            }
        })
        .catch(next)
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password

        User.findOne({
            email
        })
        .then((user) => {
            if (user === null) {
                res.status(400).json({
                    message: "email not found!"
                })
            } else {
                let hash = user.password
                let checked = checkPassword(password, hash)
                let token = generateToken({ user }, process.env.JWT_PRIVATE_KEY)

                if (checked) {
                    res.status(200).json({
                        message: "login successfully!",
                        token,
                        user
                    })
                } else {
                    res.status(400).json({
                        message: "email/password wrong!"
                    })
                }
            }
        })
        .catch(next)
    }
}

module.exports = UserCtr