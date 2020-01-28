const jwt = require('jsonwebtoken');
const User = require('../models/user');

function generateTokenGoogle(req,res,next)
{
    //console.log("user try login")
    User.findOne({email: req.body.email})
    .then((user) => {
        if(!user)
        {
            User.create({
                email: req.body.email,
                username: req.body.email.split('@')[0] + (new Date()).getTime(),
                login_type: "google"
            })
            .then((user) => {            
                res.status(201).send({
                    token: jwt.sign({
                        id: user._id,
                        username: user.username
                    },process.env.JWT_SECRET),
                    username: user.username
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({
                    msg: "invalid request"
                })
            });
        }
        else
        {            
            res.status(201).send({
                token: jwt.sign({
                    id: user._id,
                    username: user.username
                },process.env.JWT_SECRET),
                username: user.username
            })
        }
    })
    .catch(()=> {
        res.status(400).json({
            error: "Wrong username/password"
        });
    });

}

module.exports = generateTokenGoogle;