const ProductModel = require('../models/product')

function productAuthorization(req,res,next){
    ProductModel.findById(req.params.productId)
    .then(product=>{     
        if(product == null){
            res.status(404).json({
                message: 'Product not found'
            })
        }
        else {
            if(product.userOwner !== req.user.userId){
                res.status(403).json({
                    message: "Forbidden access"
                })
            }
            else {
                next()
            }
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: "Internal server error"
        })
    })
}

module.exports = productAuthorization