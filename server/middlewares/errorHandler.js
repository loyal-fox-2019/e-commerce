function errorHandler ( err,req,res,next ) {
    if( err.name === 'ValidationError') {
        let errors = []
        for(let key in err.errors) {
            errors.push(err.errors[key].message)
        }
        res.status(400).json( {errors})
    } else if ( err.name === 'CastError') {
        res.status(404).json( {errors:['Product not found.']})
    } else if ( err.name === 'Wrong Password') {
        res.status(400).json( {errors: ['Wrong Password.']})
    } else if ( err.name === 'User Not Found') {
        res.status(404).json( {errors: ['User Not Found.']} )
    } else if ( err.name === 'W Token') {
        res.status(401).json( {errors: ['Token Not Verified.']})
    } else if ( err.name === 'N Token') {
        res.status(401).json( {errors: ['No Token.']})
    } else if ( err.name === 'Stock N') {
        res.status(400).json( {errors: ['Not enough stock.']})
    } else {
        res.status(500).json( {errors: ['Internal Server Error.']})
    }
}

module.exports = { errorHandler }