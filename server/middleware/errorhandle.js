class Err {
    static errors(err, req, res){
        req.status(400).json({message: 'email already taken'})
    }
}


module.exports = Err