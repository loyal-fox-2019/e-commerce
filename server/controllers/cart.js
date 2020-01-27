const Cart = require('../models/cart')
const CariSatu = require('../helpers/findCart')

class Controller {

    static readAllCart(req, res, next) {
        Cart.find()
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static readCartForPendingStatus(req, res, next) {
        // only for auth user
        Cart.find({ buyer: req.decoded.id, status: 'pending' })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static updatePendingToPaid(req, res, next) {
        Cart.updateMany({ buyer: req.decoded.id, status: 'pending' }, { status: 'paid' }, { new: true })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static readCartForPaidStatus(req, res, next) { // ini untuk transaksi sukses dan nunggu barang
        // only for auth user 
        // ini untuk item yang udah di confirm beli oleh user
        // dan udah di cek stocknya cukup
        Cart.find({ buyer: req.decoded.id, status: 'paid' })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static updateStatusPaidToDelivered(req, res, next) {
        Cart.findByIdAndUpdate(req.params.id, { status: 'delivered' }, { new: true })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((result) => {
                // console.log(result, 'ini hasil update');
                res.status(200).json(result)
            }).catch(next);
    }

    static readCartForDeliveredStatus(req, res, next) { // ini untuk penjual yang barangnya udah diterima pembeli
        // ditampilin ke penjual setelah barangnya laku terjual
        Cart.find({ $or: [{ seller: req.decoded.id }, { buyer: req.decoded.id }], status: 'delivered' })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate({path: 'product', model: 'Product'})
            .then((result) => {
                // console.log(result, 'ini hasil read');
                res.status(200).json(result)
            }).catch(next);


    }

    static async createCart(req, res, next) {
        // buyer dari decoded
        // saat client buka item dan add to cart
        // jalankan method disini 
        // pertama CariSatu
        //          kalau ada update jumlahnya
        //          kalau tidak ada create dengan id tersebut

        // yang di pakai :
        // req.decoded.id => buyer id
        // req.body:
        // productId => id product
        // 
        // let cart = await CariSatu(req.decoded.id, req.body.productId)
        // console.log(cart, 'ini di controller cart');
        Cart.findOne({ buyer: req.decoded.id, product: req.body.product._id, status: 'pending' })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((cart) => {

                if (cart) {
                    // console.log(req.body);
                    let totalQty = cart.qty + req.body.qty
                    Cart.findOneAndUpdate({ product: req.body.product._id, buyer: req.decoded.id, status: 'pending' }, {
                        qty: totalQty
                    }, { new: true })
                        .populate('buyer', 'name phone email')
                        .populate('seller', 'name phone email')
                        .populate('product')
                        .then((result) => {
                            res.status(200).json(result)
                        }).catch(next);
                } else {
                    Cart.create({
                        buyer: req.decoded.id,
                        product: req.body.product._id,
                        seller: req.body.product.seller,
                        qty: req.body.qty
                    })
                        .then((result) => {
                            res.status(201).json(result)
                        }).catch(next);
                }

            }).catch((err) => {
                next(err)
            });
    }

    static deleteCartFromPendingStatus(req, res, next) {
        Cart.findOneAndRemove({ _id: req.params.id })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static updateJumlahItemCartDiPendingStatus(req, res, next) {
        Cart.findByIdAndUpdate(req.params.id, {
            qty: req.body.qty
        }, { new: true })
            .populate('buyer', 'name phone email')
            .populate('seller', 'name phone email')
            .populate('product')
            .then((cart) => {
                res.status(200).json(cart)
            }).catch(next);
    }

}

module.exports = Controller