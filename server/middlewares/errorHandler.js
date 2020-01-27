'use strict'

const errorHandler = (err, req, res, next) => {
    // res.send(err)
    let status, message = null
    switch (err.name) {
        case 'ValidationError':
            res.status(400).json({
                message: err.errors[Object.keys(err.errors)[0]]['message']
            })
            break

        default:
            status = err.status || 500
            message = err.message || `internal server error`
            res.status(status).json({
                message
            })
            break
    }
}

module.exports = errorHandler