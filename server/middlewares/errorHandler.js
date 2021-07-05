module.exports = {
    errorHandler: function(err, req, res, next) {
        res.json({
            message: "from error handler",
            err
        })
    }
}