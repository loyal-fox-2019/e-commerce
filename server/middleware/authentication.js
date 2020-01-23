const User = require('../model/User')
const { verifyToken } = require('../helper/jwt')

module.exports = (req,res,next)=>{
    console.log(`
        AUTHENTICATION IS RUNNING
        =========================
    `);
    
    const decodedUser =  verifyToken(req.headers.token)
    
    User.findOne({
        _id : decodedUser._id
    })
    .then(result=>{
        if(result)
          {
            console.log(' \n======================\n AUTHENTICATION PASSED')
            req.decodedUser = result
            next()
          }
        else
          {
              throw({ status:403, message:'invalid token used'})
          }
    })
    .catch(err=>{
        next(err)
    })
}