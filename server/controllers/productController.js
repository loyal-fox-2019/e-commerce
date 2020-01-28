const Product = require("../models/product");
const _ = require("underscore");

// Imports the Google Cloud client libraries
const vision = require("@google-cloud/vision");
async function detectUnsafe(url) {
    // [START vision_safe_search_detection_gcs]

    //return false;
    if(!url)
    {
        return false;
    }
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    const bucketName = process.env.BUCKETNAME;
    const fileName = url.split('/').pop();
  
    // Performs safe search property detection on the remote file
    const [result] = await client.safeSearchDetection(
      `gs://${bucketName}/${fileName}`
    );
    const detections = result.safeSearchAnnotation;
    console.log(`${url} Adult: ${detections.adult}`);
    console.log(`${url} Medical: ${detections.medical}`);
    console.log(`${url} Violence: ${detections.violence}`);

    return detections.adult == "VERY_LIKELY" || detections.racy == "VERY_LIKELY" || detections.violence == "VERY_LIKELY" || detections.medical == "VERY_LIKELY" 
    // [END vision_safe_search_detection_gcs]
}

class ProductController
{
    static getAllProducts(req,res,next)
    {
        Product.find()
        .populate('seller')
        .exec()
        .then(async (products) => {
            for(let i=0;i<products.length;i++)
            {
                let isUnsafe = await detectUnsafe(products[i].image)
                if(isUnsafe)
                {
                    products[i].image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
                }
            }
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
        .then(async (product) => {
            let isUnsafe = await detectUnsafe(product.image)
            if(isUnsafe)
            {
                product.image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
            }
            res.status(200).json(product);
        })
        .catch((err) => {
            res.status(404).json({
                msg: "Product not found"
            });
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
        .then(async (product) => {
            let isUnsafe = await detectUnsafe(product.image)
            if(isUnsafe)
            {
                product.image = "https://via.placeholder.com/400x400?text=Marked+as+unsafe";
            }
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
        .then(() => {
            
            res.status(201).json({
                msg: "Update success."
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

    static restockProduct(req,res,next)
    {
        Product.findById(req.params.id)
        .exec()
        .then((product) => {
            if(product)
            {
                product.stock += req.body.addstock;

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
}

module.exports = ProductController;