const User = require('../models/user')
const {compare} = require('../helpers/encryption')
const {GenerateToken} = require('../helpers/jwt')
const verifyGoogle = require('../helpers/verifyGoogle')
const Cart = require('../models/cart')


class UserController{
    // console.log()
    static gsignin(req,res,next){
        console.log('masuk gsignin')
        let email=null
        let name=null
        const token = req.body.data.id_token
        const payload = verifyGoogle(token)
        // console.log(payload)
        payload.then(data=>{
            email = data.email
            name = data.name
            return User.findOne({
                email
            })
        })
        .then(result=>{
            if(result){
                //generate token
                // console.log(picture)
                let payload={
                    _id: result._id,
                    username: result.username,
                    email: result.email,
                }
                const token = GenerateToken(payload)
                res.status(200).json({
                    message: 'User Signed In',
                    token,
                    payload
                })
            }else{
                console.log(process.env.USER_PASSWORD)
                return User.create({
                    username: name,
                    email,
                    password: process.env.USER_PASSWORD
                })
            }
        })
        .then(user=>{
            // console.log(user)
            let payload={
                _id: user._id,
                username: user.username,
                email: user.email
            }
            const token = GenerateToken(payload)
            res.status(200).json({
                message: 'User Signed In',
                token,
                payload
            })
        })
        .catch(err=>{
            next(err)
        })
    }
    static register(req,res,next){
        // console.log('masuk register')
        const {username, email, password} = req.body
        let user = null
        User.create({
            username,
            email, 
            password
        })
        .then(result=>{
            user = result
            let payload={
                _id: user._id,
                email: user.email
            }
            const token = GenerateToken(payload)
            res.status(201).json({
                token,
                payload
            })
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
    }
    static login(req,res,next){
        // console.log(req.body)
        let user= null
        User.findOne({ email: req.body.email })
            .then(result=>{
                // console.log(result)
                if(result){
                    // console.log(compared)
                    const compared = compare(req.body.password, result.password)
                    
                    if(compared){
                        user = result
                        let payload={
                            _id: user._id,
                            email: user.email
                        }
                        const token = GenerateToken(payload)
                        res.status(200).json({
                            token,
                            payload
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
    
    }
}


module.exports = UserController