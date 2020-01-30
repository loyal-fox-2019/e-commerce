'use strict'

const { Cart, Product } = require('../models')

class cartController {
  static addCart(req, res, next) {
    const customer = req.decoded.id
    const itemSelected = req.body.item
    let mycard
    Cart
      .findOne({ customer, status: 'pending' })
      .populate('items')
      .then((cart) => {
        if (!cart) {
          const status = 'pending'
          return Cart.create({ customer, status })
        } else {
          return cart
        }
      })
      .then((cart) => {
        cart.items.push(itemSelected)
        cart.save()
        mycard = cart
        return Product.findById(itemSelected)
      })
      .then((item) => {
        let value = {
          quantity: item.quantity - 1
        }
        return Product.findByIdAndUpdate(item._id, value, { new: true, omitUndefined: true })
      })
      .then((item) => {
        res.status(201).json(mycard)
      })
      .catch(next)
  }

  static deleteCart(req, res, next) {
    const customer = req.decoded.id
    const itemSelected = req.body.item
    let mycard
    Cart
      .findOne({ customer, status: 'pending' })
      .then((cart) => {
        let cartIndex = 0
        for (let i = 0; i < cart.items.length; i++) {
          if (cart.items[i] == itemSelected._id) {
            cartIndex = i
            break
          }
        }
        cart.items.splice(cartIndex, 1)
        cart.save()
        mycard = cart
        return Product.findById(itemSelected)
      })
      .then((item) => {
        let value = {
          quantity: item.quantity + 1
        }
        return Product.findByIdAndUpdate(item._id, value, { new: true, omitUndefined: true })
      })
      .then((item) => {
        res.status(201).json(mycard)
      })
      .catch(next)
  }

  static readCart(req, res, next) {
    const customer = req.decoded.id
    Cart
      .findOne({ customer, status: 'pending' })
      .populate('items')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static readSendingCart(req, res, next) {
    const customer = req.decoded.id
    Cart
      .find({ customer, status: 'sending' })
      .populate('items')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
    }

  static readReceivedCart(req, res, next) {
    const customer = req.decoded.id
    Cart
      .find({ customer, status: 'received' })
      .populate('items')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
    }
    
    static readProcessAllCart(req, res, next) {
      Cart
      .find({ status: 'process' })
      .populate('items')
      .populate('customer')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
    static readReceivedAllCart(req, res, next) {
      Cart
      .find({ status: 'received' })
      .populate('items')
      .populate('customer')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
    static readSendingAllCart(req, res, next) {
      Cart
      .find({ status: 'sending' })
      .populate('items')
      .populate('customer')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static checkout(req, res, next) {
    const id = req.params.id
    let value = {
      status: 'process'
    }
    Cart
      .findByIdAndUpdate(id, value, { new: true, omitUndefined: true }).populate('items')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static sending(req, res, next) {
    const id = req.params.id
    let value = {
      status: 'sending'
    }
    Cart.findByIdAndUpdate(id, value, { new: true, omitUndefined: true }).populate('items')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  static received(req, res, next) {
    console.log(req.params.id)
    const id = req.params.id
    let value = {
      status: 'received'
    }
    Cart.findByIdAndUpdate(id, value, { new: true, omitUndefined: true }).populate('items')
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(next)
  }

  readAllStatus(req, res, next) {

  }

}

module.exports = cartController