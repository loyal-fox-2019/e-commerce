const ObjectId = require('mongoose').Types.ObjectId;
const productModel = require('../models/product');

module.exports = (req, res, next) => {
    productModel
        .findOne({
            _id: ObjectId(req.params.id)
        }).populate('seller')
        .then((product) => {
            if (!product) {
                let err = new Error('Error message');
                err.statusCode = 404;
                err.message = 'Product not found';
                throw err;
            } else if (!product.seller._id.equals(req.userLogin._id) || product.seller.email != req.userLogin.email) {
                let err = new Error('Error message');
                err.statusCode = 401;
                err.message = 'You are not authorized accessing this data';
                throw err;
            } else {
                next();
            }
        }).catch((err) => {
            res.status(err.statusCode || 500).json({
                message: err.message || 'Internal Server Error'
            });
        });
};