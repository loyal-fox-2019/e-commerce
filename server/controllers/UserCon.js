//models
const User = require('../models/User')

//token & commpare password
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')


class UserCon {
    static findAll(req,res,next){
        User.find()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static  register(req,res,next){
        User.create(req.body)
            .then(user=>{
                let token = generateToken(user)  
                let {email,_id,name,role,cart} = user
                res.status(201).json({
                    message : 'register succesfully',
                    token : token,
                    user : {
                        email,
                        _id,
                        name,
                        role,
                        cart
                    }                        
                })
            })
            .catch(next)
    }

    static login(req,res,next){
        User.findOne({ 
            email : req.body.email
        })
        .then(user => {            
            if (user) { 
                if ( comparePassword(req.body.password, user.password)  ) {               
                    let token = generateToken(user)  
                    let {email,_id,name,role,cart} = user
                    res.status(200).json({
                        message : 'login succesfully',
                        token : token,
                        user : {
                            email,
                            _id,
                            name,
                            role,
                            cart
                        }                        
                    })
                } else {                    
                    next({
                        status: 403,
                        message: 'Wrong Password'
                    })
                }
            } else {
                next({
                    status : 404,
                    message : 'user not found'
                })
            } 
        })
        .catch(next)
    }

}

module.exports = UserCon