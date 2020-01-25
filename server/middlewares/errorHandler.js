function errorHandler(err, req, res, next) {
    if (err.name == 'ValidationError') {
        res.status(400).json({
            errMessage: err.message
        })
    } else {
        res.status(500).json({
            message: 'Internal Server Error',
            err
        })
    }
}

module.exports = errorHandler;