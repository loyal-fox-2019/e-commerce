const User = require('../models/user')
const { genToken } = require('../helpers/jwt')
const { dehash } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.G_CLIENT);


class Controller {

    static async readAllUser(req, res, next) {
        try {
            let user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        // console.log('masuk login', req.body);
        try {
            if (!req.body.email && !req.body.password) throw ({ status: 400, msg: 'Email is required, Password is required' })
            else if (!req.body.password) throw ({ status: 400, msg: 'Password is required' })
            else if (!req.body.email) throw ({ status: 400, msg: 'Email is required' })
            else {
                const { email, password, } = req.body
                let user = await User.findOne({ email: email })
                if (!user || !dehash(password, user.password)) throw ({ status: 400, msg: 'email or password not match' })
                else {
                    let token = genToken({ id: user._id, name: user.name })

                    res.status(200).json({ token, name: user.name })
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            if (!req.body.email && !req.body.password) throw ({ status: 400, msg: 'Email is required, Password is required' })
            else if (!req.body.password) throw ({ status: 400, msg: 'Password is required' })
            else if (!req.body.email) throw ({ status: 400, msg: 'Email is required' })
            let user = await User.create(req.body)

            let token = genToken({ id: user._id, name: user.name })

            res.status(201).json({ token, name: user.name })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static hapus(req, res, next) {
        User.findByIdAndRemove(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static async googleSignIn(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            User.findOne({ email: ticket.getPayload().email })
                .then((user) => {
                    if (!user) {
                        User.create({
                            email: ticket.getPayload().email,
                            name: ticket.getPayload().name,
                            password: ticket.getPayload().email,
                            phone: '00000000000',
                            city: 'Jakarta'
                        })
                            .then((result) => {
                                let tokenData = { id: result._id, name: result.name }
                                let token = genToken(tokenData)
                                res.status(201).json({ token, name: result.name, invitation: result.invitation })
                            }).catch(next);
                    } else {
                        let tokenData = { id: user._id, name: user.name }
                        let token = genToken(tokenData)
                        res.status(200).json({ token, name: user.name, invitation: user.invitation })
                    }
                })
                .catch(next);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller