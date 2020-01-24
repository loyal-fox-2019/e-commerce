const User = require('../models/userModel');
const {comparer} = require('../helpers/bcrypt');
const {tokenGenerator} = require('../helpers/jwt');

class UserController{
    static register(req,res,next){
        if(req.body.email === 'admin@hacktivshop.com'){
            next('invalid-admin')
            return
        }
        
        User.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static login(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then(response => {
            console.log('account found')
            console.log(response)
            if(response){
                if(!comparer(req.body.password,response.password)){
                    next('invalid-password')
                }
                else{
                    const token = tokenGenerator(req.body)
                    res.status(200).json(token)
                }
            }
            else{
                next('invalid-registered')
            }
        })
        .catch(err => {
            next(500)
        })
    }
    
    static google(req,res,next){

    }
}

module.exports = UserController
