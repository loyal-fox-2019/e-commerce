const user = require('../models/user')
const jwt = require('jsonwebtoken')
const compare = require('../helpers/bcryptCompare')

class UserController {
    static register(req, res, next){
        user.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            address : req.body.address,
            admin : req.body.admin
        })
        .then(newUser=>{
            let payload = {
                id : newUser._id,
                admin : newUser.admin
            }
            let token = jwt.sign(payload, process.env.NODE_ENV)
            res.status(201).json({token})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static login(req, res, next){
        let token
        let payload = {}
        user.findOne({email: req.body.email})
        .then(userData=>{
            if(!userData){
                console.log('invalid email or pass')
            }else{
                payload.id = userData._id
                payload.name = userData.name
                payload.admin = userData.admin
                return compare(req.body.password, userData.password)
            }
        })
        .then(compareResult=>{ 
            if(!compareResult){
                console.log('invalid email or pass')
            }else{
                token = jwt.sign(payload, process.env.NODE_ENV)
                res.status(200).json({token})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = UserController