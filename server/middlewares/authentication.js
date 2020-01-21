const {DecodeToken} = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req,res,next)=>{
    // console.log(req.headers,'authentication')
    if(req.headers.hasOwnProperty('token')){
        const payload = DecodeToken(req.headers.token)
        // console.log(payload, 'payload')
        User
            .findOne({email: payload.email})
            .then(user=>{
                // console.log(user,'user')
                if(user){
                    req.payload = payload
                    next()
                }else{
                    res.status(400).json({
                        message: 'user not found'
                    })
                }
            })
            .catch(err=>{
                res.status(400).json(err)
            })
    }else{
        res.status(400).json({
            message: 'user not logged in'
        })
    }
}