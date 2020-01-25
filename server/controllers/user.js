const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

class User {
    static register(req, res, next) {
        const {
            fullname,
            email,
            username,
            password,
            profilePicture
        } = req.body

        userModel
            .create({
                fullname,
                email,
                username,
                password,
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
                    fullname
                })
            })
            .catch(next);
    }

    static login(req, res, next) {
        const {
            username,
            password
        } = req.body
        let name;

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
                    token
                });
            })
            .catch(next);
    }
}

module.exports = User;