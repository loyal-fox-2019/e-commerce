const { User, Product } = require('../models')
const { sign } = require('../helpers/token')
const { compare } = require('../helpers/bcrypt')

class UserController{
  static register(req, res, next){
    let { username, email, password } = req.body
    User
      .create({username, email, password})
      .then((user) => {
        let payload = {
          _id: user._id
        }
        let token = sign(payload)
        res.status(201).json({access_token: token, username: user.username})
      })
      .catch(next)
  }
  static login(req, res, next){
    let { user, password } = req.body
    User
      .findOne({
        $or: 
        [
          {username: user},
          {email: user}
        ]
      })
      .then((user) => {
        if (user && compare(password, user.password)){
          let payload = {_id: user._id}
          let token = sign(payload)
          res.status(200).json({access_token: token, username: user.username})
        }
        else {
          throw {errorStatus: 400, errorMessage: 'Wrong credential'}
        }
      })
      .catch(next)
  }
  static getUserCart(req, res, next){
    User
      .findById(req.userData._id)
      .populate({
        path: 'cart.productId',
        populate: {
          path: 'userId',
          select: 'username -_id'
        }
      })
      .then((user) => {
        res.status(200).json(user.cart)
      })
      .catch(next)
  }
  static addToCart(req, res, next){
    let { productId, quantity } = req.body
    quantity = Number(quantity)
    let searchQuery = {_id: req.userData._id, 'cart.productId': productId}
    let options = {new: true}
    let insertObj = {$push: {cart: {productId, quantity}}}
    let updateObj = {$inc: {'cart.$.quantity': quantity}}
    let productData = {}
    let total = 0
    Product
      .findById(productId)
      .then((product) => {
        productData = product
        if (product && product.stock >= quantity){
          return User
            .findOne(searchQuery)
        }
        else {
          throw {errorStatus: 400, errorMessage: 'Product not found'}
        }
      })
      .then((user) => {
        if (user) {
          let allowed = true
          user.cart.forEach((e) => {
            if (e.productId == productId && productData.stock < (e.quantity + quantity)){
              allowed = false
              total = e.quantity
            }
            else if (e.productId == productId){
              total = e.quantity
            }
          })
          if (allowed){
            total += quantity
            return User
              .findOneAndUpdate(searchQuery, updateObj, options)
          }
          else {
            throw {errorStatus: 400, errorMessage: `You already have ${total} in your cart`}
          }
        }
        else {
          total += quantity
          return User
            .findByIdAndUpdate(req.userData._id, insertObj, options)
        }
      })
      .then(() => {
        res.status(200).json({total})
      })
      .catch(next)
  }
  static removeFromCart(req, res, next){
    let updateObj = {$pull: {cart: {productId: req.body.productId}}}
    let options = {new: true}
    User
      .findByIdAndUpdate(req.userData._id, updateObj, options)
      .then(() => {
        res.status(204).json()
      })
      .catch(next)
  }
  
}

module.exports = UserController