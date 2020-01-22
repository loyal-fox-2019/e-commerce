module.exports = function (req, res, next){
    if(req.loggedUser.admin){
        next()
    }else{
        res.status(403).json({err:'You are not authorized to see this page'})
    }
}