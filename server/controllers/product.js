'use strict';
const { Product } = require('../models');

class ProductController {
  static async addProduct(req, res, next) {
    try {
      const { name, image, wear, stock, price, } = req.body;
      const docs = {
        name,
        image,
        wear,
        stock,
        price,
      };
      const response = await Product.create(docs)
      const { _id } = response;
      res.status(201).json({ id: _id, name });
    } catch (err) {
      next(err);
    }
  }

  static async getSkins(req, res, next) {
    try {
      const skins = await Product.find().sort({ stock: 1 })
      res.status(200).json(skins);
    } catch (err) {

    }
  }

  static async addStock(req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      const check = await Product.findOne({ _id: id })
      if(!check) {
        next({ auth: true, status: 404, message: 'Product not found' })
      } else {
        const response = await Product.findOneAndUpdate({ _id: id }, { $inc: { stock: stock } })
        res.status(200).json(response)
      }
    } catch (err) {
      next(err);
    }
  }

  static async skinDetail(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Product.findOne({ _id: id });
      res.status(200).json(response);
    } catch (error) {
      next(err);
    }
  }

  static async findSkins(req, res, next) {
    try {
      const { query } = req.query;
      const response = await Product.find({ name: { $regex: query, $options: 'i' } });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async removeStock(req, res, next) {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      const check = await Product.findOne({ _id: id })
      if (!check) {
        next({ auth: true, status: 404, message: 'Product not found' })
      } else {
        if (check.stock < stock) {
          next({ auth: true, status: 400, message: 'insufficient stock'})
        }
      }
      const response = await Product.findByIdAndUpdate({ _id: id }, { $inc: { stock: -stock } })
      res.status(200).json(response);
    } catch (err) {
      next(err)
    }
  }

  static async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const check = await Product.findOne({ _id: id })
      if (!check) {
        next({ auth: true, status: 404, message: 'Product not found' })
      } else {
        const response = await Product.deleteOne({ _id: id })
        res.status(200).json({ response });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;