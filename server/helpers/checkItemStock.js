const Item = require('../models/Item')

async function checkItemStock(cart) {
    let outOfStock = []

    cart.forEach(async (cartItem) => {
        let item = await Item.findOne({_id: cartItem.item})

        if(cartItem.quantity > item.stock) outOfStock.push({
            itemId: item._id,
            itemName: item.name,
            itemStock: item.stock
        })
    })

    return outOfStock
}

module.exports = {
    checkItemStock
}