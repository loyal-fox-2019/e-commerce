const Product = require("../models/product");
const User = require("../models/user");

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
    User.findById(req.userInfo.id)
    .then((user) => {
        if(!user)
        {
            res.status(404).json({
                msg: "Account not found"
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

module.exports = {
    product_authorisation,
    user_authorisation
};
