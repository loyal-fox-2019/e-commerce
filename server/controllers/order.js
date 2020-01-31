'use strict';
const { Order } = require('../models');

class OrderController {
  static async getList(req, res, next) {
    try {
      const response = await Order.find().sort({ createdAt: 1 });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
