const Item = require('../models/item')

class ItemController {
  static addItem(req, res, next) {
    Item.create({
      name: req.body.name,
      stock: req.body.stock,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    })
      .then(item => {
        res.status(201).json({ message: 'Item added' })
      })
      .catch(next)
  }

  static getAllItems(req, res, next) {
    Item.find({})
      .then(items => {
        res.json({ items })
      })
      .catch(next)
  }

  static getSingelItem(req, res, next) {
    Item.findOne({ _id: req.params.itemId })
      .then(item => {
        res.json({ item })
      })
      .catch(next)
  }

  static updateItem(req, res, next) {
    Item.findOne({ _id: req.params.itemId })
      .then(item => {
        if (!item) {
          throw { name: 'NotFound', message: 'Item not found' }
        }

        item.name = req.body.name || item.name
        item.stock = req.body.stock || item.stock
        item.price = req.body.price || item.price

        return item.save()
      })
      .then(() => res.json({ message: 'Item updated' }))
      .catch(next)
  }

  static deleteItem(req, res, next) {
    Item.findOneAndDelete({ _id: req.params.itemId })
      .then(item => {
        if (!item) {
          throw { name: 'NotFound', message: 'Item not found' }
        }

        res.json({ message: 'Item deleted' })
      })
      .catch(next)
  }
}

module.exports = ItemController
