const usersRouter = require("express").Router();
const User = require("../models/user");
const _ = require("underscore");

usersRouter.post('/register',(req,res,next) => {
    const data = _.pick(req.body,'username','password');
    User.create(data)
    .then((user) => {
        res.status(201).json(user);
    })
    .catch((err) => {
        console.log(err);
    })
});

usersRouter.post('/login',(req,res,next) => {
    const data = _.pick(req.body,'username','password');
    User.findOne({
        username: data.username
    })
});

usersRouter.post('/cart',(req,res,next) => {
    
    
});

module.exports = usersRouter;