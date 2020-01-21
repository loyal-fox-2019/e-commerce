const router = require('express').Router()
const User = require('../models/user')
const {GenerateToken} = require('../helpers/jwt')
const {compare} = require('../helpers/encryption')
const Cart = require('../models/cart')
const UserController = require('../controllers/userController')

router.post('/register', function(req,res){
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

router.post('/login', function(req,res){
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


module.exports = router