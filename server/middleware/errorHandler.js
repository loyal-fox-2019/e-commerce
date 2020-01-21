const errHandler = (err, req, res, next) => {
    console.log(err)

    if (err.code === 11000 || err.name === 'ValidationError'){
        res.status(400).json({
            code: 400,
            errMsg: `${err._message} / User already registered`
        })
    } else if (err.code === 404) {
        res.status(err.code).json({
            code: err.code,
            errMsg: `${err.errMsg} not found`
        })
    } else {
        res.status(500).json({
            code: 500,
            errMsg: 'Internal server error'
        })
    }
};

module.exports = {
    errHandler
};