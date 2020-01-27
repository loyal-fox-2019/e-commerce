'use strict'

const Transaction = require('../models/transaction')
const mongoose = require('mongoose')

class Controller {
    static getAllTransaction(req, res, next) {
        Transaction
            .find({})
            .populate('userId')
            .then((allTransaction) => {
                res.status(200).json(allTransaction)
            })
            .catch(next)
    }

    static getUserTransaction(req, res, next) {
        Transaction
            .find({ userId: req.user.id })
            .then((userTransaction) => {
                res.status(200).json(userTransaction)
            })
            .catch(next)
    }

    static getUserTransactionOne(req, res, next) {
        Transaction
            .findOne({ _id: req.params.id })
            .then((userTransaction) => {
                res.status(200).json(userTransaction)
            })
            .catch(next)
    }

    static updateStatusTransaction(req, res, next) {
        console.log('masukkk')
        Transaction
            .findOneAndUpdate({ _id: req.params.id }, {
                // userId:mongoose.mongo.ObjectID("d090b906a610e1881c459244"),
                status: "Received"
            }, { new: true })
            .then((updatedTransaction) => {
                res.status(200).json(updatedTransaction)
            })
            .catch(next)
    }
}

module.exports = Controller