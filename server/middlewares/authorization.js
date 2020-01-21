const Item = require('../models/item')

module.exports = (err, req, res, next) => {
    const id = req.loggedIn.id
    try {
        Item.findOne({user_id: id})
            .then(result => {
                if (result) {
                    next()
                }else {
                    throw new Error('Sorry you are not authorized')
                }
            })
    }
    catch {
        res.status(403).json({
            message: 'Sorry you are not authorized',
            err
        })
    }
}