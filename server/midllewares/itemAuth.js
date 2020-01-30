const Item = require('../models/Item')

module.exports = {
        itemAuthorize : (req, res, next) => {
            Item.findById(req.params.id)
                .then(item => {
                    if (item) { 
                        if (String(item.seller) == req.user._id) {
                            next()
                        } else {
                            next({
                                status : 401,
                                message : 'Not Authorized'
                            })
                        }
                    } else {
                        next({
                            status : 404,
                            message : 'item not found'
                        })
                    }
                })
                .catch(next)
    } 
}