const errHandler = (err, req, res, next) => {
    console.log(err);

    if (err.code === 11000 || err.name === 'ValidationError') {
        res.status(400).json({
            code: 400,
            errMsg: "Data has been registered, please check again"
        })
    } else if (err.code === 401) {
        res.status(err.code).json({
            code: err.code,
            errMsg: 'You have no authorized to do this action'
        })
    } else if (err.code === 404) {
        res.status(err.code).json({
            code: err.code,
            errMsg: `${err.errMsg} not found`
        })
    } else if (err.code === 400) {
        res.status(err.code).json({
            code: err.code,
            errMsg: err.errMsg
        })
    } else if (err.code === 403) {
        res.status(err.code).json({
            code: err.code,
            errMsg: err.errMsg
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