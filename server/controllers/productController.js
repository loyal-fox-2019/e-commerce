const Product = require("../models/product");
const _ = require("underscore");

class ProductController
{
    static getAllProducts(req,res,next)
    {
        Product.find()
        .populate('seller')
        .exec()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    static getOneProduct(req,res,next)
    {
        Product.findById(req.params.id)
        .populate('seller')
        .exec()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    static addNewProduct(req,res,next)
    {
        console.log(req.body);
        
        const data = _.pick(req.body,'name','price','image','stock','description');
        data.tags = req.body.tags.split(' ').filter((v) => {return !!v});
        data.seller = req.userInfo.id;
        data.image = req.body.file;
        data.sold = 0;

        Product.create(data)
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    static editProduct(req,res,next)
    {
        const data = _.pick(req.body,'name','price','description');
        data.tags = req.body.tags.split(' ').filter((v) => {return !!v});
        data.seller = req.userInfo.id;

        if(req.body.changeImage == 'true')
        {
            data.image = req.body.file;
        }

        Product.findById(req.params.id)
        .exec()
        .then((product) => {
            if(product)
            {
                for(let key in product)
                {
                    if(data.hasOwnProperty(key))
                    {
                        product[key] = data[key];
                    }
                }

                return product.save()                
            }
            else
            {
                res.status(404).json({
                    msg: "Product not found."
                })
            }
        })
        .then((updated) => {
            
            res.status(201).json({
                msg: "Update success.",
                updated: updated
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static deleteProduct(req,res,next)
    {
        Product.findByIdAndDelete(req.params.id)
        .exec()
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            res.status(404).json({
                msg: "Product not found."
            })
        })
    }
}

module.exports = ProductController;