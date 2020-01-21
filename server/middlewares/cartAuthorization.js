function cartAuthorization(req,res,next){
    if(req.user._id !== req.params.ownerId) {
        res.status(403).json({
            message: "Forbidden access"
        })
    }
    else {
        next()
    }
}

module.exports = cartAuthorization