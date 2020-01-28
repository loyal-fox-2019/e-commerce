const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (req, res, next) => {    
    try {
        const token = req.headers.token;
        const userPayload = jwt.verify(token, process.env.JWT_SECRET);

        userModel
            .findOne({
                _id: ObjectId(userPayload._id),
                email: userPayload.email,
                username: userPayload.username
            })
            .then((authenticatedUser) => {
                if (!authenticatedUser) {
                    // throw new Error('You are not a registered user');
                    res.status(400).json({
                        msg: 'You are not registered'
                    });
                } else {
                    req.userLogin = authenticatedUser;
                    next();
                }
            }).catch((err) => {
                throw err;
            });
    } catch (err) {
        res.status(err.statusCode || 404).json({
            msg: 'Invalid Token'
        });
    }
}