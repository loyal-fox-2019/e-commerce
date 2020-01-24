module.exports = (req,res,next) => {
    console.log(req.userLoggedIn)
    if(req.userLoggedIn.email === 'admin@hacktivshop.com'){
        next()
    }
    else{
        next(401)
    }
};
