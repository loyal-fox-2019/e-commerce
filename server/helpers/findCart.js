const Cart = require('../models/cart')

async function cari(idBuyer, idproduct) {
    return await Cart.findOne({buyer: idBuyer, product: idproduct}).populate('buyer').populate('seller').populate('product')
}

module.exports = cari