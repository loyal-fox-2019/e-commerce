const jwt = require('jsonwebtoken')

class Verification{
    static authenCustomer(req,res,next){
        try{
            let payload = jwt.verify(req.headers.token, process.env.SECRET)
            req.data = payload
            next()
        }catch(err){
            next({message: 'bad token'})
        }
    }

    static authenAdmin(req,res,next){
        try{
            let payload = jwt.verify(req.headers.token, process.env.SECRET)
            req.data = payload
            if(payload.admin){
                next()
            }else{
                next({message: 'admin only'})
            }
        }catch(err){
            next({errorCode: 400})
        }
    }


}


module.exports = Verification