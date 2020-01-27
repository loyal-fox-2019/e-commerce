const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')

module.exports = {
    authenticate : (req, res, next) => {
        try {   
            const user = verifyToken(req.headers.token)  
            User.findOne({_id :user.user._id})
            .then (User => {    
                if (User) {
                    req.user = user.user
                    next()
                } else {
                    next({
                        message : 'user not Found',
                        status : 404
                    })
                }
            })     
        } 
        catch(err) {  
            next(err)    
        }
    },
    adminAuthenticate : (req, res, next) => {
        try {
            const user = verifyToken(req.headers.token)
            User.findOne({
                _id : user.user._id,
            })
            .then(data =>{
                if(data){
                    if(data.role === 'admin'){
                        req.user = user.user
                        next()
                    }else{
                        next({
                            message : 'user not admin',
                            status : 404
                        })
                    }
                }else {
                    next({
                        message : 'user not found',
                        status : 404
                    })
                }
            })
        } 
        catch(err) {
            next(err)
        }
    }   
} 