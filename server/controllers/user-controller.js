const user_model = require('../models/user-model')
const jwt = require('jsonwebtoken')
const pass = require('../helper/hash')

class User{
    static signup(req,res,next){
        const input = {
            first_name: req.body['first_name'],
            last_name: req.body['last_name'],
            email: req.body.email,
            password: req.body.password,
            admin: false,
            address: req.body.address
        }
        user_model.create(input)
        .then((data)=>{
            let payload = {
                userid: data['_id'],
                admin: data.admin
            }
            let token = jwt.sign(payload, process.env.SECRET)
            res.status(201).json({token})
        })
        .catch((err)=>{
            next({errorCode: 400, message: 'Email already Use'})
        })
    }

    static signupadmin(req,res,next){
        const input = {
            first_name: req.body['first_name'],
            last_name: req.body['last_name'],
            email: req.body.email,
            password: req.body.password,
            admin: true,
            address: req.body.address
        }
        user_model.create(input)
        .then((data)=>{
            let payload = {
                userid: data['_id'],
                admin: data.admin
            }
            let token = jwt.sign(payload, process.env.SECRET)
            res.status(201).json({token})
        })
        .catch((err)=>{
            next({errorCode: 400})
        })
    }

    static signin(req,res,next){
        let user = null
        user_model.findOne({
            email: req.body.email
        })
        .then((data)=>{
            user = data
            return pass.compare(req.body.password, data.password)
        })
        .then((cmpr)=>{
            if(cmpr){
                let payload = {
                    userid: user['_id'],
                    admin: user.admin
                }
                let token = jwt.sign(payload, process.env.SECRET)
                res.status(200).json({token})
            } else {
                next({errorCode: 400})
            }
        })
        .catch((err)=>{
            next(err)
        })
    }

    static signinadmin(req,res,next){
        let user = null
        user_model.findOne({
            email: req.body.email
        })
        .then((data)=>{
            user = data
            return pass.compare(req.body.password, data.password)
        })
        .then((cmpr)=>{
            if(cmpr){
                if(user.admin){
                    let payload = {
                        userid: user['_id'],
                        admin: user.admin
                    }
                    let token = jwt.sign(payload, process.env.SECRET)
                    res.status(200).json({token})
                } else {
                    next({errorCode: 400})
                }
            } else {
                next({errorCode: 400})
            }
        })
        .catch((err)=>{
            next({errorCode: 400})
        })
    }
}

module.exports = User