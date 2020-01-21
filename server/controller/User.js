const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errMsg = "User/ password not found";

class UserController {
    static reqisterUser(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cart: []
        }).then(response => {
            let token = jwt.sign({userId: response._id}, process.env.SECRET_KEY);
            let name = response.name.split(" ");
            res.status(200).json({
                name: name[0],
                token: token,
                message: "User successfully registered"
            })
        }).catch(err => {
            next(err);
        })
    }

    static findUserid(req, res, next) {
        User.findById(
            req._id
        ).then(response => {
            // console.log(response);
            let token = jwt.sign({userId: response._id}, process.env.SECRET_KEY);
            let name = response.name.split(" ");
            res.status(200).json({
                name: name[0],
                token: token,
                message: "User successfully verified"
            })
        }).catch(err => {
            next(err)
        })
    }

    static loginUser(req, res, next) {
        User.findOne({
            email: req.body.email
        }).then(response => {
            if (!response) throw errMsg;
            let isMatch = bcrypt.compareSync(req.body.password, response.password);
            if (!isMatch) throw errMsg;
            let token = jwt.sign({userId: response._id}, process.env.SECRET_KEY);
            let name = response.name.split(" ");
            res.status(200).json({
                name: name[0],
                token: token,
                message: "User successfully login"
            })
        }).catch(next)
    }

    static addToCart(req, res, next) {
        User.updateOne({
            _id: req._id
        }, {
            $push: {
                cart: {
                    item: req.body.cart.item,
                    stock: req.body.cart.stock,
                    totalPrice: (req.body.cart.price * req.body.cart.stock)
                }
            }
        }).then(response => {
            if (response.ok < 1) throw "cart failed to update";
            res.status(200).json({
                message: "item successfully add to cart"
            });
        }).catch(next)
    }

    static viewUser(req, res, next) {
        User.findById(
            req._id
        ).populate(
            'cart.item'
        ).then(response => {
            res.status(200).json({
                data: response
            })
        }).catch(next)
    }
}

module.exports = UserController;