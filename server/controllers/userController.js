const User = require("../models/user");
const Product = require("../models/product")
const _ = require("underscore");

const comparePassword = require("../helpers/bcrypt").comparePassword;
const generateToken = require("../helpers/jwt").generateToken;

class UserController
{
    static registerUser(req, res, next)
    {
        const data = _.pick(req.body,'username','password','email');
        data.login_type = "standard";
        User.create(data)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log(err);            
            res.status(400).json({
                msg: err.message
            });
        })
    }

    static loginUser(req, res, next)
    {
        const data = _.pick(req.body,'email','password');
        User.findOne({
            email: data.email
        })
        .exec()
        .then((user) => {
            if(user)
            {
                if(comparePassword(data.password,user.password))
                {
                    res.status(200).json({
                        token: generateToken({
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }),
                        username: user.username
                    });
                }
                else
                {
                    res.status(400).json({
                        msg: "Wrong username/password"
                    });
                }
            }
            else
            {
                res.status(404).json({
                    msg: "Account does not exist"
                });
            }
        })
    }

    static getMyProducts(req,res,next)
    {
        Product.find({
            seller: req.userInfo.id
        })
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            console.log(err);
            
            res.status(400).json({
                msg: "error"
            });
        })
    }

    static getMyCart(req,res,next)
    {
        User.findById(req.userInfo.id)
        .populate({
            path: 'cart.product',
            populate: {
                path: 'seller'
            }
        })
        .exec()
        .then((user) => {
            if(user)
            {
                console.log(user.cart);
                
                res.status(200).json(user.cart);
            }
            else
            {
                res.status(404).json({
                    msg: "Account does not exist"
                });
            }
        })
        .catch((err) => {
            console.log(err);
            
            res.status(400).json({
                msg: "error"
            });
        })
    }

    static addToCart(req,res,next)
    {
        const data = _.pick(req.body,'product','quantity');
        let thisUser;
        User.findById(req.userInfo.id)
        .exec()
        .then((user) => {
            if(user)
            {
                thisUser = user;
                return Product.findById(data.product).exec();
                
            }
            else
            {
                res.status(404).json({
                    msg: "Account does not exist"
                });
            }
        })
        .then((product) => {
            if(product)
            {
                let isInCart = false;
                for(let i=0;i<thisUser.cart.length;i++)
                {
                    if(thisUser.cart[i].product.toString() == data.product.toString())
                    {
                        thisUser.cart[i].quantity += data.quantity;
                        isInCart = true;
                        break;
                    }
                }

                if(!isInCart)
                {
                    thisUser.cart.push(data);
                }
                thisUser.save();
            }
            else
            {
                res.status(404).json({
                    msg: "Product does not exist"
                });
            }
        })
        .then(() => {
            res.status(201).json({
                msg: "Added to cart successfully"
            })
        })
        .catch((err) => {
            console.log(err);
            
            res.status(400).json({
                msg: "error"
            });
        })
    }
}

module.exports = UserController;