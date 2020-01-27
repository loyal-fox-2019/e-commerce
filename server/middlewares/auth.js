`use strict`

const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Product = require('../models/product')


function authenticating(req, res, next) {
    // console.log('masuk authen');
    try {
        // if(req.headers.token == 'admin') next()

        req.decoded = verifyToken(req.headers.token)
        // console.log(req.decoded);
        User.findById(req.decoded.id)
            .then((user) => {
                // console.log(user);
                if (!user) throw ({ status: 404, msg: 'User undefined/not registered' })
                else next()
            })
            .catch((err) => {
                next (err)
            });
    } catch (error) {
        next(error)
    }
}

function authorizating(req, res, next) {
    // if(req.headers.token == 'admin') next()


    Product.findById(req.params.id)
    .then((result) => {
        if(!result) throw ({status: 400, msg: 'Product not found'})
        else if(result.seller != req.decoded.id) throw({status: 403, msg: 'Forbidden!'})
        else next()
    }).catch(next);
}

module.exports = {
    authenticating,
    authorizating
}