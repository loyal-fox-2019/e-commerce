const Bag = require('../models/bag.js')
const { ObjectId } = require('mongoose').Types

class ControllerBag {
  static create(req, res, next) {
    const item = {
      userId: req.userInfo.id,
      productId: req.body.productId,
      jumlah: req.body.jumlah
    }
    // console.log(item)
    Bag.create(item)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    Bag.find({
      userId: ObjectId(req.userInfo.id)
    })
      .populate(['productId'])
      .then((result) => {
        // console.log(result)
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static patchJumlah(req, res, next) {
    Bag.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id)
      },
      {
        jumlah: req.body.jumlah
      }
    )
      .then(() => {
        // console.log(result)
        res.status(200).json('jumlah berhasil diubah')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static checkout(req, res, next) {
    Bag.updateMany(
      {
        $and: [
          {
            userId: ObjectId(req.userInfo.id)
          },
          {
            status: false
          }
        ]
      },
      {
        status: true
      }
    )
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    Bag.findByIdAndDelete({
      _id: ObjectId(req.params.id)
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerBag
