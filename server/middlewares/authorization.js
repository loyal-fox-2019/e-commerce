require('dotenv').config()

module.exports = function (req, res, next){
    if(req.loggedUser.email.includes(process.env.COMPANY_EMAIL)){
        next()
    }else{
        res.status(401).json({err:'You are not authorized to see this page'})
    }
}