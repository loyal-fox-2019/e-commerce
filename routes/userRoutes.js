const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const User = require('../models/user')
const {GenerateToken} = require('../helpers/jwt')
const {compare} = require('../helpers/encryption')
const Cart = require('../models/cart')


mongoose.connect('mongodb://localhost:27017/ecommerce_'+process.env.NODE_ENV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/register', function(req,res){
    // console.log(req.body)
    const {username, email, password} = req.body
    let user = null
    User.create({
        username,
        email, 
        password
    })
    .then(result=>{
        user = result
        return Cart.create({ owner: user._id })
    })
    .then(result=>{
        // console.log(user)
        res.status(201).json(user)
    })
    .catch(err=>{
        // console.log(err.message)
        // if(err.message==)
        res.status(400).json(err.message)
    })
})

app.post('/login', function(req,res){
    // console.log('masuk login')
    User
        .findOne({
            email: req.body.email
        })
        .then(user=>{
            if(user){
                const compared = compare(req.body.password, user.password)
                if(compared){
                    let payload={
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                    const token = GenerateToken(payload)
                    // console.log(token)
                    res.status(200).json({
                        token,
                        username: user.username,
                        email: user.email
                    })
                }else{
                    res.status(400).json({
                        message: 'wrong username/password'
                    })
                }
            }else{
                res.status(401).json({
                    message: "user's not registered"
                })
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })

})


module.exports = app