const modelUser = require('../models/modelUser')
const generateToken = require('../helpers/generateToken')
const matchPass = require('../helpers/matchPass')
const modelCart = require('../models/modelCart')
const verifyTokenG = require('../middleware/verifyTokenG.js')

class ControlUser {
    static register(req, res) {
        modelUser.findOne({ email: req.body.email })
            .then(resultFoundforRegister => {
                if (resultFoundforRegister) {
                    res.status(400).json({ message: "email already taken" })
                } else {
                    return modelUser.create(req.body)
                }
            })
            .then(userRegistered => {
                let token = generateToken({ id: userRegistered._id })
                res.status(201).json({ userRegistered, token })

            })

            .catch(err => {
                console.log('error register:', err)
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        modelUser.findOne({ email: req.body.email })
            .then(emailFound => {
                if (emailFound) {
                    let cocokPass = matchPass(req.body.password, emailFound.password)
                    if (cocokPass) {
                        let token = generateToken({ id: emailFound._id })
                        req.headers.token = token
                        res.status(200).json({ emailFound, token })
                        // console.log(token)
                    } else {
                        res.status(400).json({ message: "wrong username/password" })
                    }
                } else {
                    res.status(400).json({ message: "email not found" })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getUser(req, res) {
        modelUser.findById(req.params.id)
            .then(ketemu => {
                if (ketemu) {
                    res.status(200).json(ketemu)
                } else {
                    res.status(404).json({ message: "user not found" })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static google(req, res, next) {
        const tokenGoogle = req.body.idtoken
        const payload = verifyTokenG(tokenGoogle)
        let firstName
        let lastName
        let email
        payload.then(data => {
            // console.log(data, "<<ini data")
            // console.log(data.name, "<<ini name")
            // console.log(data.email, "<<ini email")
            if (data.given_name) {
                firstName = data.given_name
                lastName = data.family_name
            } else {
                firstName = data.name
            }
            email = data.email

            return modelUser.findOne({ email })
        })
            .then(found => {
                if (found) {
                    return found
                } else {
                    modelUser.create({
                        email: email,
                        firstName: firstName,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                // console.log(user._id)
                let token = generateToken({ id: user._id })
                res.status(201).json({ user, token })
            })
            .catch(err => {
                console.log(err)
            })
    }
}
module.exports = ControlUser