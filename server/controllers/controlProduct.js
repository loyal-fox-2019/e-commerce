const modelProduct = require('../models/modelProduct')
const modelCart = require('../models/modelCart')
const modelTransaction = require('../models/modelTransaction')

class ControlProduct {
    static addProduct(req, res) {
        modelProduct.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            file: req.body.file,
            stock: req.body.stock,
            ownerId: req.payload.id
        })
            .then(productPosted => {
                // console.log(productPosted, "ini product posted")
                res.status(201).json(productPosted)
            })
            .catch(err => {
                // console.log(err)
                res.status(400).json(err)
                // for (let key in err.errors.name) {
                //     if (err.errors.name[key] === "ValidatorError") {

                //     }
                // }
            })
    }

    static getAllProduct(req, res) {
        modelProduct.find()
            .then(allProducts => {
                // console.log(allProducts)
                res.status(200).json(allProducts)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findByName(req, res) {
        modelProduct.find({ name: new RegExp(req.params.name, "i") })
            .then(resultProduct => {
                res.status(200).json(resultProduct)

            })
            .catch(err => {
                // console.log(err)
                res.status(500).json(err)
            })
    }

    static updateProduct(req, res) {
        modelProduct.findByIdAndUpdate(req.params.id, req.body)
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                // console.log("err adalah: ", err)
                res.status(500).json(err)
            })
    }

    static deleteProduct(req, res) {
        modelProduct.findByIdAndDelete(req.params.id)
            .then(toBeDeleted => {
                res.status(200).json(toBeDeleted)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static myProducts(req, res, next) {
        let userId = req.payload.id
        modelProduct.find().populate('ownerId')
            .then(all => {
                let mine = []
                for (let product of all) {
                    if (product.ownerId) {
                        if (product.ownerId._id == userId) {
                            mine.push(product)
                        }
                    }
                }
                res.status(200).json(mine)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static findById(req, res) {
        modelProduct.findById(req.params.id)
            .then(productFound => {
                if (productFound) {

                    res.status(200).json(productFound)
                } else {
                    res.status(400).json({ message: "No Product Found" })
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Internal Server Error" })
            })
    }
    static addToCart(req, res, next) {
        modelCart.create({
            userId: req.payload.id,
            productId: req.params.id,
            qty: req.body.qty,
            checkOut: false,
            totalPrice: req.body.totalPrice
        })
            .then(cartAdded => {
                res.status(201).json(cartAdded)
            })
            .catch(err => {
                res.status(500).json({ err, message: "Internal server Error" })
            })
    }

    static getMyCarts(req, res, next) {
        modelCart.find().populate("productId")
            .then(allCartFound => {
                let mine = []
                // console.log(allCartFound)
                for (let i of allCartFound) {
                    if (i.userId == req.payload.id) {
                        mine.push(i)
                    }
                }
                res.status(200).json(mine)

            })
            .catch(err => {
                res.status(500).json({ err, message: "internal error server" })
            })
    }

    static deleteFromCart(req, res) {
        modelCart.find().populate("productId")
            .then(allCartFound => {
                let mine = []
                for (let i of allCartFound) {
                    if (i.userId == req.payload.id) {
                        mine.push(i)
                    }
                }
                // console.log(mine)
                let toBeDeletedFromCart
                for (let j of mine) {
                    if (req.params.id == j._id) {
                        toBeDeletedFromCart = j

                    }
                }
                // console.log(toBeDeletedFromCart)
                return modelCart.findByIdAndDelete(toBeDeletedFromCart._id)
            })
            .then(() => {
                res.status(200).json({ message: "successfully deleted" })
            })
            .catch(err => {
                res.status(500).json({ err, message: "internal error server" })
            })

    }

    static checkOut(req, res, next) {
        let productAll = []
        modelCart.find().populate("productId")
            .then(allCartFound => {
                let mineToCheckout = []
                for (let i of allCartFound) {
                    if (i.userId == req.payload.id && !i.checkOut) {
                        mineToCheckout.push(i)
                    }
                }
                productAll = mineToCheckout
                let udpatedAll = []
                for (let one of mineToCheckout) {
                    return modelCart.findByIdAndUpdate(one._id, { checkOut: true })
                        .then(updated => {
                            udpatedAll.push(updated)
                            let jumlahBought = updated.qty
                            // console.log(updated, "ini yang diupdate")
                            return modelProduct.findById(updated.productId)
                                .then(productFound => {
                                    let jumlahAwal = productFound.stock
                                    let akhir = jumlahAwal - jumlahBought
                                    return modelProduct.findByIdAndUpdate(productFound._id, { stock: akhir })
                                })
                        })
                }

            })
            .then(() => {
                return modelTransaction.create({
                    dateCheckedOut: new Date(),
                    userId: req.payload.id,
                    total: req.body.total,
                    detail: productAll
                })

            })
            .then(() => {
                res.status(200).json({ message: "checkout berhasil" })
            })
            .catch(err => {
                console.log(err)
            })

    }

    static getHistory(req, res, next) {
        modelTransaction.find().populate("userId")
            .then(datas => {
                let punyaku = []
                for (let satu of datas) {
                    if (satu.userId._id == req.payload.id) {
                        punyaku.push(satu)
                    }
                }
                res.status(200).json(punyaku)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ControlProduct