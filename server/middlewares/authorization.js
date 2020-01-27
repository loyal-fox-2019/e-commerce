'use strict'

const { verify } = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    let accessToken = verify(req.headers["access-token"])
    User
        .findOne({ _id: accessToken.id })
        .then((findOneUser) => {
            if (findOneUser.role == 'admin') {
                next()
            }
            else {
                res.status(401).json(
                    {
                        type: 'AUTHORIZATION ERROR',
                        message: 'You do not have access!'
                    }
                )
            }
        })
}