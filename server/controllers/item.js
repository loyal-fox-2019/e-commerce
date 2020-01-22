const { Item } = require('../models');

class ItemController {
  static create(req, res, next) {
    Item.create(req.body)
      .then(item => {
        res.status(201).json({
          message: `Item has been successfully created!`
        });
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    Item.find({})
      .then(items => {
        if (items.length === 0) {
          res.status(404);
          throw new Error('Item collection is empty!');
        } else {
          res.status(200).json({
            message: 'All items are successfully retrevied!',
            data: items
          });
        }
      })
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    Item.findById(req.params.itemId)
      .then(item => {
        if (!item) {
          res.status(404);
          throw new Error(`Item is not found!`);
        } else {
          res.status(200);
          res.json({
            message: `Item is successfully retrieved!`,
            data: item
          });
        }
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    Item.findByIdAndUpdate(req.params.itemId, req.body)
      .then(item => {
        if (!item) {
          res.status(404);
          throw new Error(`Item is not found!`);
        } else {
          res.status(200);
          res.json({
            message: `Item is successfully updated!`
          });
        }
      })
      .catch(err => next(err));
  }

  static delete(req, res, next) {
    Item.findByIdAndDelete(req.params.itemId)
      .then(item => {
        if (!item) {
          res.status(404);
          throw new Error(`Item is not found!`);
        } else {
          res.status(200);
          res.json({
            message: `Item is successfully removed!`
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = ItemController;
