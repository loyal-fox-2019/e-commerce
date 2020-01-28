const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class User {
    static oauthLogin(req, res, next) {
        let gPayload;
        let userStatus = 200;
        let userId
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(({payload}) => {
            gPayload = payload
            return userModel
                .findOne({
                    email: payload.email
                })
        })
        .then((user) => {
            if (user) {
                return user
            } else {
                userStatus = 201;
                return userModel
                    .create({
                        fullname: gPayload.name,
                        email: gPayload.email,
                        username: gPayload.email,
                        password: gPayload.sub,
                        profilePicture: gPayload.picture
                    })
            }
        }).then((registeredUser) => {
            userId = registeredUser._id
            return jwt.sign({
                _id: registeredUser._id,
                fullname: registeredUser.fullname,
                email: registeredUser.email,
                username: registeredUser.username
            }, process.env.JWT_SECRET)
        }).then((token) => {
            res.status(userStatus).json({
                token,
                fullname: gPayload.name,
                userId
            })
        }).catch(next);
    }

    static isEmailUnique(req, res, next) {
        userModel
            .findOne({
                email: req.query.email
            })
            .then((user) => {
                res.status(200).json(user)
            }).catch(next);
    }

    static register(req, res, next) {
        let profilePicture
        if (req.body.profilePicture) {
            profilePicture = req.body.profilePicture
            delete req.body.profilePicture
        }

        userModel
            .create({
                ...req.body,
                profilePicture: profilePicture || 'https://00e9e64bacf9d0062620ad332146db16b425e82d76d831fdfc-apidata.googleusercontent.com/download/storage/v1/b/tookoo-img/o/default-profile-picture1.jpg?qk=AD5uMEuinLvQkX6ZcLP_yTpjlFNpkPjNciUO-HcvtsWqEe2cQKPHWPTN7WfSSOnnVxyoD9SkRLEIyoPQqExKi2xo3d6YwPRvM-7VVwdsh1yePDdzkSqyCbyaKDRSNJTRNXEb4WNewwQ6SAinE-vvfdLtdXu3ES8WqnPdMLa3W7K80VdWnlFPeetIDPwbzUa9ICfe4th0l8PbCUQD_Xoy6e6cNC1lF1MR5Tni_UYqYH0lYW5phdG0f4qk1TtmW-AlzC9fLinxV9nV4Fdb7TZ1Aum-LpuwrHC5OUN-XLVaghzu5Q_2-VE5qy5ZM9Uv0rCH79MOS31BMIcuFzlZnVEZ_98k4KSjH3CdpxfDrNdSG4vL9eLmd3dQvsxk1sNOVxX8R6LVofEiol6EA9FCNs-SlOW_UiThkbCNe6lXlt1bKkfNG9dvjdFoS2f4_l3Fvwf__GADCcGUd0gl2-EIBfftSw4I85ajdcP_AAHyPq05HGKzb-ucDBSVh9i1trDyhkqlxriKfQfgUD3XB7uKItME6k6i15foFC83zB6iIKeuOGBi8rKP9CQrNmg4MJpnC60lRaZLOZonNm4Y7sGxmV3Q6Yla9h2TGHL7FJZUznfpS5HzULfs_fk5UxEc9z7R3i3O-ABEkciB9mwmsEOCyZ01HMRmHXfMLydioIZ4i2l1QbawxDT2V61ikOPXaZLPGVcJasgR6Zdlx3xeq3Sc-6fTbRjDp7k6XcLSPMMkHKSt36-RzqdvJ3d7ohTTN2VpGZDDQtHMnEYsljjQCZX9ltE3tahEP5T3l3vP5Q1-xug_97PbPVJVkkJ62IU'
            })
            .then((user) => {
                return jwt.sign({
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    username: user.username
                }, process.env.JWT_SECRET)
            })
            .then((token) => {
                res.status(201).json({
                    token,
                    fullname: req.body.fullname
                })
            })
            .catch(next);
    }

    static login(req, res, next) {
        const {
            username,
            password
        } = req.body
        let name, userId;

        userModel
            .findOne({
                $or: [{
                    username
                }, {
                    email: username
                }]
            })
            .then((user) => {
                if (!user) {
                    let err = new Error('User Not Registered')
                    err.statusCode = 404
                    err.errMessage = 'User Not Registered'
                    throw err
                } else if (!bcrypt.compareSync(password, user.password)) {
                    let err = new Error('Invalid Username or Password')
                    err.statusCode = 400
                    err.errMessage = 'Invalid Username or Password'
                    throw err
                } else {
                    name = user.fullname
                    userId = user._id
                    return jwt.sign({
                        _id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        username: user.username
                    }, process.env.JWT_SECRET)
                }
            })
            .then((token) => {
                res.status(200).json({
                    name,
                    token, 
                    userId
                });
            })
            .catch(next);
    }
}

module.exports = User;