const Transaction = require('../models/Transaction')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
class TransactionController {

  static create(req, res, next){
    const totalPayment = TransactionController.generateTotalPayment(req.body.products);

    const updateStock = TransactionController.updateStockProduct(req.body.products)

    let result;
    Promise.all(updateStock)
      .then(products => {
        console.log(products)
        return Transaction
                .create({
                  costumer: req.userId,
                  status: 'Pending',
                  products: req.body.products,
                  totalPayment: totalPayment
                })
      })
      .then(transaction => {
        result = transaction
        return Cart
                .deleteMany({
                  costumer: req.userId,
                })
      })
      .then((carts) => {
        console.log(carts)
        res.status(201).json(result)
      })
      .catch(next)
  }

  static getByCostumer(req, res, next){
    Transaction
      .find({
        costumer: req.userId
      })
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static getAll(req, res, next){
    Transaction
      .find()
      .populate('costumer')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static generateTotalPayment(carts){
    let totalPayment = 0;
    carts.forEach( function(cart, index) {
      totalPayment += cart.totalPrice
    });
    return totalPayment
  }

  static updateStockProduct(carts){
    const updateStock = []
    carts.forEach( function(cart, index) {
      const updateStockTemp = Product.updateOne({ _id: cart.product._id }, {
        stock: cart.product.stock - cart.amount
      })
      updateStock.push(updateStockTemp)
    });
    return updateStock
  }
}

module.exports = TransactionController