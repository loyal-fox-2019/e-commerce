'use strict';
const { Product, Cart, Order } = require('../models');

class CartController {
  static async removeItem(req, res, next) {
    try {
      const { id } = req.token;
      await Cart.updateOne(
        { customerId: id },
        { $pull: { items: { "items.productId": req.params.id } } }
        )
        res.status(200).json({ message: 'Item removed from your cart' });
    } catch (err) {
      next(err);
    }
  }

  static async removeCart(req, res, next) {
    try {
      await Cart.deleteOne({ customerId: req.params.id });
      res.status(200).json({ message: 'Your cart now is empty' });
    } catch (err) {
      next(err);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const { id } = req.token;
      const { productId, productName, qty, productPrice, price } = req.body;
      const totalPrice = qty*productPrice;
      const item = {
        productId,
        productName,
        qty,
        totalPrice,
        price
      };
      const newPrice = Number(price);
      // Find if cart with customerId exist or not,
      const isExist = await Cart.findOne({ customerId: id });
      if (!isExist) {
        // if not exist, then create new card
        const docs = {
          customerId: id,
          items: [item],
        }
        const create = await Cart.create(docs);
        res.status(200).json({ message: 'Product added to card' });
      } else {
        // if already exits ...then find if a product already in items or not
        const findItem = await Cart.findOne({ items: { $elemMatch: { productId } } })
        if (!findItem) {
          // if product not in item yet, then push it!!!!!!
          await Cart.updateOne(
            { customerId: id },
            { $push: { items: item } }
          );
          res.status(200).json({ message: 'Product added to card' });
        } else {
          // else, update product qty and total price
          // wow... this one is confusing :(
          const addQty = await Cart.updateOne(
            { "items.productId": {$eq: productId} },
            { $inc: { "items.$.qty": qty, "items.$.totalPrice": newPrice } }
          );
          const { n, nModified } = addQty;
          if (n != 0 && nModified != 0) {
            res.status(200).json({ message: 'Product added to card' });
          }
        }
      }
    } catch (err) { 
      next(err)
    }
  }

  static async changeToCheckout(req, res, next) {
    try {
      let isStock = true;
      let name = '';
      const { customerId } = req.params;
      const products = await Cart.findOne({customerId})
      const { items } = products;
      const customerProducts = items.length;
      let counter = 0;
      let update = 0
      let total = 0;
      while (counter < customerProducts) {
        total += items[counter].totalPrice;
        const product = await Product.findOne({ _id: items[counter].productId })
        if ((product.stock - items[counter].qty) < 0) {
          isStock = false;
          name = product.name;
        }
        counter++
      }
      if (!isStock) {
        next({ auth: true, status: 400, message: `insufficient stock at item ${name}.` });
      } else {
        while (update < customerProducts) {
          await Product.updateOne({ _id: items[update].productId }, { $inc: { stock: -items[update].qty } })
          update++
        }
        await Cart.updateOne({ customerId }, { $set: { checkout: true } })
        const orderDoc = {
          customerId,
          totalPrice: total,
          products: items,
          totalPrice: req.body.payload.total,
        };
        await Order.create(orderDoc);
        res.status(200).json({ message: 'Your purchases is in process...' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async changeToDelivered(req, res, next) {
    try {
      const { customerId } = req.params;
      await Cart.deleteOne({ customerId });
      await Order.updateOne(
        { customerId, delivered: false },
        { $set: { delivered: true } }
      );
      res.status(200).json({ message: 'Thanks for choosing us, GL HF!' });
    } catch (err) {
      next(err)
    }
  }

  static async getOrderList(req, res, next) {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      next(err)
    }
  }

  static async getMyCart(req, res, next) {
    try {
      const { id } = req.token;
      const carts = await Cart.findOne({ customerId: id });
      res.status(200).json(carts);
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController;
