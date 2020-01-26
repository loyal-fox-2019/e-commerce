const Item = require('../models/item')

module.exports = (err, req, res, next) => {
    const id = req.loggedIn.id
    const role = req.loggedIn.role
    console.log(id, role)
    try {
        Item.findOne({user_id: id})
            .then(result => {
                console.log('ini autho', result)
                if (result && role == 'admin') {
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