const Transaction = require('../models/transaction'),
  Product = require('../models/product')

class TransactionController {
  static async create(req, res, next) {
    let { product, quantity } = req.body,
      user = req.user.id
    // find one
    //    kalau ketemu
    //        cek stok
    //          kalau abis
    //            err stok tidak cukup
    //          kalau masih cukup
    //            updateOne
    //    kalau ga ketemu
    //        cek stok
    //          kalau abis
    //            err stok tidak cukup
    //          kalau masih
    //            create

    try {
      let transaction = await Transaction.findOne({ product, user, status: 'pending'})
      if(transaction) {
        let product = await Product.findById(transaction.product)
        if(product.stock < transaction.quantity + quantity) {
          next({status: 400, message: 'Stok tidak cukup'})
        } else {
          let update = await Transaction.updateOne({_id: transaction._id}, {quantity: transaction.quantity + quantity}, { runValidators: true })
          res.send(update)
        }
      } else {
        let currentProduct = await Product.findOne({_id: product})
        if(currentProduct.stock < quantity) {
          next({status: 400, message: 'Stok tidak cukup'})
        } else {
          let newTransaction = await Transaction.create({ product, quantity, user })
          res.send(newTransaction)
        }
      }
    } catch (error) {
      next(error)
    }
  }
  static all(req, res, next) {
    Transaction
      .find()
      .populate('user', '-password')
      .populate('product')
      .then(transactions => {
        res.send(transactions)
      })
      .catch(next)
  }
  static getPending(req, res, next) {
    Transaction
      .find({ user: req.user.id, status: 'pending' })
      .populate('product')
      .then(transactions => {
        let results = []
        transactions.forEach(transaction => {
          results.push({
            _id: transaction._id,
            name: transaction.product.name,
            price: transaction.product.price,
            qty: transaction.quantity,
            subTotal: transaction.product.price * transaction.quantity,
          })
        });
        res.send(results)
      })
      .catch(next)
  }
  static getPaid(req, res, next) {
    Transaction
      .find({ user: req.user.id, status: 'paid' })
      .populate('product')
      .then(transactions => {
        let results = []
        transactions.forEach(transaction => {
          results.push({
            _id: transaction._id,
            name: transaction.product.name,
            price: transaction.product.price,
            qty: transaction.quantity,
            subTotal: transaction.product.price * transaction.quantity,
          })
        });
        res.send(results)
      })
      .catch(next)
  }
  static getDelivered(req, res, next) {
    Transaction
      .find({ user: req.user.id, status: 'delivered' })
      .then(transactions => {
        res.send(transactions)
      })
      .catch(next)
  }
  static remove(req, res, next) {
    let _id = req.params.id
    Transaction
      .deleteOne({ _id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static delivered(req, res, next) {
    let _id = req.params.id
    Transaction
      .updateOne({ _id }, { status: 'delivered' })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static purchase(req, res, next) {
    Transaction
      .updateMany({ user: req.user.id, status: 'pending' }, { status: 'paid' })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static async purchaseVerify(req, res, next) {
    // cek stok tiap product
    // find transaction
    // foreach tiap transaction
    // tampung di errors
    // if errors .length == 0, updatemany
    try {
      let transactions = await Transaction.find({ user: req.user.id, status: 'pending' }),
        errors = []
      for (let i = 0; i < transactions.length; i++) {
          let check = await Product.findById(transactions[i].product)
          if(check.stock < transactions[i].quantity) {
            errors.push(`${check.name} sudah keduluan orang`)
          }
      }
      if(errors.length == 0) {
        let purchased = await Transaction.updateMany({ user: req.user.id, status: 'pending' }, { status: 'paid' })
        for (let i = 0; i < transactions.length; i++) {
          let current = await Product.findById(transactions[i].product)
          let update = await Product.updateOne({_id: current._id}, {stock: current.stock - transactions[i].quantity})
        } 
        res.send({message: 'Sukses bayar'})
      } else {
        next({status: 400, message: errors})
      }
    } catch (error) {
      next(error)
    }
  }
  static allDelivered(req, res, next) {
    Transaction
      .updateMany({ user: req.user.id, status: 'paid' }, { status: 'delivered' })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static cancelPurchase(req, res, next) {
    Transaction
      .deleteMany({ user: req.user.id, status: 'pending' })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = TransactionController