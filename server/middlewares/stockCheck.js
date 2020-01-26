const Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')

function itemStock(req, res, next) {
    let list = req.body
    // console.log(req.body)

    let promises = []
    list.forEach(elem => {
        promises.push(Product.findById(elem._id))
    })

    Promise.all(promises)
        .then(results => {
            let indexYangKurang = 0
            if (results.some((item, index) => {
                indexYangKurang = index
                return item.stock < list[index].qty
            })) {
                throw { message: `${list[indexYangKurang]} stock nya kurang` }
            } else {
                // bikin transaction
                next()
            }
        })
        .catch(next)
}

function addChecking(req, res, next) {
    let barang = req.body

    let promises = [
        Cart.findOne({ buyer: req.decoded.id, status: 'pending' }),
        Product.findById(barang.product._id)
    ]

    Promise.all(promises)
        .then((result) => {
            // console.log(result)
            let kart = result[0]
            let gudang = result[1]

            if (!gudang) throw ({ msg: 'Stock tidak ada', status: 400 })
            else if (gudang.stock - kart.qty < barang.qty) throw ({ msg: "stock tidak cukup", status: 400 })
            else next()
        }).catch(next);

}


module.exports = {
    itemStock,
    addChecking
}