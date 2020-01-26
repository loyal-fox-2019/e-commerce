const Product = require("../models/product");

function product_authorisation(req,res,next)
{    
    Product.findById(req.params.id)
    .then((product) => {
        if(product.seller.toString() != req.userInfo.id)
        {
            res.status(403).json({
                msg: "Not authorised"
            })
        }
        else
        {
            next();
        }
    })
    .catch((err) => {
        console.log(err);
        
    });
}

function user_authorisation(req,res,next)
{    
    User.findById(req.params.id)
    .then((user) => {
        if(user._id.toString() != req.userInfo.id)
        {
            next({status: 403, message: "Not authorised"});
        }
        else
        {
            next();
        }
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = {
    product_authorisation,
    user_authorisation
};
