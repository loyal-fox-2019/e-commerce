const Model = require("../models/products");

class Product {
  static addProduct(req, res, next) {
    Model.create({
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      thumbnail: req.body.thumbnail
    })
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }
  static getAllProduct(req, res, next) {
    Model.find()
      .then(products => {
        res.status(200).json(products);
      })
      .catch(next);
  }
  static getById(req, res, next) {
    Model.findById(req.params.id)
      .then(product => {
        res.status(200).json(product);
      })
      .catch(() => {
        let err = {
          name: "Not Found",
          message: "Cannot Find Product"
        };
        next(err);
      });
  }
  static deleteProduct(req, res, next) {
    Model.findByIdAndDelete(req.params.id)
      .then(deleted => {
        if (deleted) {
          res.status(200).json({ message: "Successfully deleted Product" });
        } else {
          let err = {
            name: "Not Found",
            message: "Cannot Find Product"
          };
          next(err);
        }
      })
      .catch(next);
  }
  static updateProductStock(req, res, next) {
    Model.findByIdAndUpdate(req.params.id, { stock: req.body.stock })
      .then(updated => {
        if (updated) {
          res.status(200).json({ message: "Stock Porduct Updated" });
        } else {
          let err = {
            name: "Not Found",
            message: "Cannot Find Product"
          };
          next(err);
        }
      })
      .catch(next);
  }
  static updateProduct(req, res, next) {
    Model.findByIdAndUpdate(req.params.id, {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    })
      .then(() => {
        res.status(200).json({ message: "Product Detail Updated" });
      })
      .catch(next);
  }
}

module.exports = Product;
