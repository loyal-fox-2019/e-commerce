const Cart = require('../models/cart')
const Item = require('../models/item')

class CartController {
  static async addNewCart(req, res, next) {
    try {
      const cart = await Cart.create({
        owner: req.payload.id,
      })
      res.json({ cart })
    } catch (err) {
      next(err)
    }
  }

  static async getUserCart(req, res, next) {
    try {
      const cart = await Cart.findOne({ owner: req.payload.id })
        .populate('owner', 'username')
        .populate('items.item')
      res.json({ cart })
    } catch (err) {
      next(err)
    }
  }

  static async pushItemToCart(req, res, next) {
    const errors = []

    if (!req.body.itemId) errors.push('Item is required')
    if (!req.body.quantity) errors.push('Quantity is required')

    if (errors.length > 0) {
      return next({ name: 'BadRequest', message: errors })
    }

    // it mean it can be push new item,
    // or increment/decrement item quantity
    try {
      const item = await Item.findOne({ _id: req.body.itemId })

      if (!item) throw { name: 'NotFound', message: 'Item not found' }

      const cart = await Cart.findOne({ owner: req.payload.id })

      const itemInCart = cart.items.find(item => {
        return item.item == req.body.itemId
      })

      if (itemInCart) {
        // kalau ada berarti increment or decrement quantity
        itemInCart.quantity += Number(req.body.quantity)
        await cart.save({ validateBeforeSave: false })
        res.json({ message: 'Item at cart updated' })
      } else {
        // push item baru ke cart items
        cart.items.push({
          item: req.body.itemId,
          quantity: req.body.quantity,
        })
        await cart.save({ validateBeforeSave: false })
        res.json({ message: 'Item added to cart' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async popItemFromCart(req, res, next) {
    try {
      const item = await Item.findOne({ _id: req.body.itemId })

      if (!item) throw { name: 'NotFound', message: 'Item not found' }

      const cart = await Cart.findOne({ owner: req.payload.id })

      const indexItem = cart.items.findIndex(item => {
        return item.item == req.body.itemId
      })

      if (indexItem == -1) {
        throw { name: 'NotFound', message: 'Item not found on cart' }
      }

      cart.items.splice(indexItem, 1)

      await cart.save({ validateBeforeSave: false })
      res.json({ message: 'Item removed' })
    } catch (err) {
      next(err)
    }
  }

  static async updateItemFromCart(req, res, next) {
    const errors = []

    if (!req.body.itemId) errors.push('Item is required')
    if (!req.body.quantity) errors.push('Quantity is required')

    if (errors.length > 0) {
      return next({ name: 'BadRequest', message: errors })
    }

    try {
      const item = await Item.findOne({ _id: req.body.itemId })

      if (!item) throw { name: 'NotFound', message: 'Item not found' }

      const cart = await Cart.findOne({ owner: req.payload.id })

      const itemInCart = cart.items.find(item => {
        return item.item == req.body.itemId
      })

      if (itemInCart) {
        // kalau ada berarti increment or decrement quantity
        itemInCart.quantity = Number(req.body.quantity)
        await cart.save({ validateBeforeSave: false })
        res.json({ message: 'Item at cart updated' })
      } else {
        // push item baru ke cart items
        throw { name: 'NotFound', message: 'Item in cart not found' }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController
