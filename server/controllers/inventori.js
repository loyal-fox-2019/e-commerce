const Inventori = require('../models/inventori')
const { ObjectId } = require('mongoose').Types

class ControllerInventori {
  static create(req, res, next) {
    const item = {
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      harga: req.body.harga,
      stok: req.body.stok,
      gambar: req.body.gambar,
      kategori: req.body.kategori,
      tanggal: new Date(),
      seller: req.userInfo.username,
      userId: req.userInfo.id
    }
    Inventori.create(item)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static find(req, res, next) {
    Inventori.find()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }

  static findAll(req, res, next) {
    Inventori.find({
      $and: [
        {
          userId: {
            $ne: ObjectId(req.userInfo.id)
          }
        },
        {
          stok: {
            $gt: 0
          }
        }
      ]
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }

  static getInv(req, res, next) {
    Inventori.findOne({
      $and: [
        {
          _id: ObjectId(req.params.idBarang)
        },
        {
          userId: req.params.userId
        }
      ]
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }

  static getOwnInv(req, res, next) {
    Inventori.find({
      userId: ObjectId(req.userInfo.id)
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }

  static update(req, res, next) {
    const item = {
      nama: req.body.nama,
      deskripsi: req.body.deskripsi,
      harga: req.body.harga,
      stok: req.body.stok,
      gambar: req.body.gambar,
      kategori: req.body.kategori
    }
    Inventori.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id)
      },
      item
    )
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }

  static updateStok(req, res, next) {
    Inventori.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id)
      },
      {
        stok: req.body.stok
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
    Inventori.findByIdAndDelete({
      _id: ObjectId(req.params.id)
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  }
}

module.exports = ControllerInventori
