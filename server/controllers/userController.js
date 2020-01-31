const user = require('../models/user')
const jwt = require('jsonwebtoken')
const compare = require('../helpers/bcryptCompare')


class UserController {
    static register(req, res, next){
        // req.logged = {email:'test@lshop.com'}
        require('dotenv').config()
        if(req.body.email.includes(process.env.COMPANY_EMAIL) && !req.logged.email.includes(process.env.COMPANY_EMAIL)){
            next('You are not authorized to register this account')
        }
        user.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            address : req.body.address
        })
        .then(newUser=>{
            let payload = {
                id : newUser._id,
                email : newUser.email
            }
            let token = jwt.sign(payload, process.env.NODE_ENV)
            res.status(201).json({token})
        })
        .catch(err=>{
            next()
        })
    }

    static login(req, res, next){
        let token
        let payload = {}
        user.findOne({email: req.body.email})
        .then(userData=>{
            if(!userData){
                next('invalid email or pass')
            }else{
                payload.id = userData._id
                payload.name = userData.name
                payload.email = userData.email
                return compare(req.body.password, userData.password)
            }
        })
        .then(compareResult=>{ 
            if(!compareResult){
                next('invalid email or pass')
            }else{
                if(payload.email.includes('lshop')){
                    token = jwt.sign(payload, process.env.NODE_ENV)
                    res.status(200).json({token, email: payload.email})
                }
                token = jwt.sign(payload, process.env.NODE_ENV)
                res.status(200).json({token})
            }
        })
        .catch(err=>{
            next()
        })
    }
}

module.exports = UserController