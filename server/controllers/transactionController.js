const { Transaction, User, Product } = require('../models')

class TransactionController{
  static showAllTransaction(req, res, next){
    Transaction
      .find({})
      .populate({
        path: 'userId',
        select: 'username -_id'
      })
      .populate({
        path: 'products.productId',
        select: 'name -_id'
      })
      .then((transactions) => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }
  static postTransaction(req, res, next){
    let updateObj = {$set: {cart: []}}
    let options = {new: true}
    let userCart = []
    User
      .findById(req.userData._id)
      .then((user) => {
        userCart = user.cart
        if (user.cart.length == 0){
          throw {errorStatus: 400, errorMessage: "You can't checkout an empty cart"}
        }
        return Transaction
          .create({userId: req.userData._id, status: 'on delivery', products: user.cart})
      })
      .then(() => {
        let promises = []
        userCart.forEach((e) => {
          promises.push(Product
            .findById(e.productId)
            .then((product) => {
              if (e.quantity > product.stock){
                throw {errorStatus: 400, errorMessage: `Not enough stock left`}
              }
            })
            .catch((err) => {
              throw err
            })
          )
        })
        return Promise.all(promises).then(() => {return userCart})
      })
      .then((userCart) => {
        let promises = []
        userCart.forEach((e) => {
          promises.push(Product
            .findByIdAndUpdate(e.productId, {$inc: {stock: (e.quantity * -1)}}, {new: true})
          )
        })
        return Promise.all(promises)
      })
      .then(() => {
        return User
          .findByIdAndUpdate(req.userData._id, updateObj, options)
      })
      .then(() => {
        res.status(201).json({message: 'Checkout success'})
      })
      .catch(next)
  }
  static getUserTransaction(req, res, next){
    Transaction
      .find({userId: req.userData._id})
      .populate('products.productId', 'name -_id')
      .then((transactions) => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }
  static confirmTransaction(req, res, next){
    Transaction
      .findByIdAndUpdate(req.params.transactionId, {status: 'delivered'})
      .then((transaction) => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }
}

module.exports = TransactionController