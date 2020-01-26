const Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')

function itemStock(req, res, next) {
    let list = req.body
    // console.log(req.body, 'boda')

    let promises = []
    list.forEach(elem => {
        promises.push(Product.findById(elem.product._id))
    })

    Promise.all(promises)
        .then(results => {
            // console.log(results);
            let indexYangKurang = 0
            if (results.some((item, index) => {
                // console.log(item);
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
        Cart.findOne({ product: barang.product._id, buyer: req.decoded.id, status: 'pending' }),
        Product.findById(barang.product._id)
    ]

    Promise.all(promises)
        .then((result) => {
            // console.log(result)
            let kart = result[0]
            // console.log(kart);
            let gudang = result[1]

            if (!kart) {
                kart = { qty: 0 }
            }
            // console.log(kart);
            // console.log((gudang.stock - kart.qty) < barang.qty, gudang.stock, kart.qty, barang.qty);
            // console.log(gudang.stock - kart.qty, 'lebih kecil dari', barang.qty);
            if (!gudang) { throw ({ msg: 'Stock tidak ada', status: 400 }) }
            else if (gudang.stock - kart.qty < barang.qty) { throw ({ msg: "stock tidak cukup", status: 400 }) }
            else { next() }
        }).catch(next);

}

function stockCutter(req, res, next) {
    let list = req.body
    // console.log(req.body)

    let promises = []
    list.forEach(elem => {
        let mainStock = elem.product.stock - elem.qty
        promises.push(Product.findByIdAndUpdate(elem.product._id, { stock: mainStock }, { new: true }))
    })

    Promise.all(promises)
        .then((results) => {
            console.log(results);
            next()
        })
        .catch(next)
}


module.exports = {
    itemStock,
    addChecking,
    stockCutter
}