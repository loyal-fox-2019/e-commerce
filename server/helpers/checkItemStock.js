const Item = require('../models/Item')

async function checkItemStock(cart) {
    // try {
    //     let outOfStock = []
        
    //     // cart.forEach(async (cartItem, i) => {
    //     //     let item = await Item.findOne({_id: cartItem.item})
    //     //     console.log(`this is item ${i}'s item ${item}`)
    //     //     console.log(`this is cartItem ${i}'s requested quantity: ${cartItem.quantity}`)
    //     //     console.log(cartItem.quantity > item.stock)
    //     //     if(cartItem.quantity > item.stock) {
    //     //         console.log('out of stock')
    //     //         outOfStock.push({
    //     //             itemId: item._id,
    //     //             itemName: item.name,
    //     //             itemStock: item.stock
    //     //         })
    //     //     }
    //     // })

    //     async (cart.forEach(async (cartItem, i) => {
    //         let item = await Item.findOne({_id: cartItem.item})
    //         if(cartItem.quantity > item.stock) {
    //             outOfStock.push({
    //                 itemId: item._id,
    //                 itemName: item.name,
    //                 itemStock: item.stock
    //             })
    //         }
    //     }))()

    //     console.log(outOfStock, 'this is outOfStock array')
    
    //     return outOfStock
    // }
    // catch (error) {
    //     return new Error(error.message)
    // }

    try {
        let outOfStock = []
        let itemPromises = []

        cart.forEach(cartItem => {
            itemPromises.push(Item.findOne({_id: cartItem.item}))
        })

        const items = await Promise.all(itemPromises)

        cart.forEach((cartItem, i) => {
            // console.log('index', i, cartItem.quantity > items[i].stock)
            if(cartItem.quantity > items[i].stock) {
                outOfStock.push({
                    itemId: items[i]._id,
                    itemName: items[i].name,
                    itemStock: items[i].stock
                })
            }
        })

        return outOfStock
    }
    catch (error) {
        return new Error(error.message)
    }
}

module.exports = {
    checkItemStock
}