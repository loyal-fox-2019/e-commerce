class Err {
    static errors(err, req, res, next){
        let errorCode = err.errorCode || 500
        let message = err.message || 'Internal server error'
        res.status(errorCode).json(message)
    }
}


module.exports = Err