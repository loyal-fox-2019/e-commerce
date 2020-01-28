const Recap = require('../models/recap')
const { ObjectId } = require('mongoose').Types

class ControllerRecap {
  static insertMany(req, res, next) {
    // console.log(req.body.items)
    Recap.insertMany(req.body.items)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    Recap.find({
      user: ObjectId(req.userInfo.id)
    })
      .populate(['item'])
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerRecap
