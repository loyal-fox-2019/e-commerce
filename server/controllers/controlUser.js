const modelUser = require('../models/modelUser')
const generateToken = require('../helpers/generateToken')
const matchPass = require('../helpers/matchPass')

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
}
module.exports = ControlUser