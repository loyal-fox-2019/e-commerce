const modelUser = require('../models/modelUser')
const modelProduct = require('../models/modelProduct')

//to edit add and delete
function toEditAndDeleteProduct(req, res, next) {
    let idUser = req.payload.id
    modelProduct.findById(req.params.id)
        .then(productFound => {
            if (productFound.ownerId == idUser) {
                next()
            } else {
                res.status(401).json({ message: 'unauthorized' })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

function toAddCart(req, res, next) {


}

// function toEditAndDeleteCart()

module.exports = { toEditAndDeleteProduct, toAddCart }