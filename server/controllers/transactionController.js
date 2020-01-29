const Transaction = require('../models/transactionModel');

class TransactionController{
    static checkout(req,res,next){
        Transaction.create(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(500)
        })
    }

    static delete(req,res,next){
        Transaction.deleteOne({
            _id : req.params._id
        })
        .then(response => {
            if(response.n === 0){
                next(400)
            }
            else{
                res.status(200).json(response)
            }
        })
    }

    static update(req,res,next){
        Transaction.findOneAndUpdate({
            _id : req.params._id
        },req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }

    static findAll(req,res,next){
        Transaction.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }

    static findOne(req,res,next){
        Transaction.findOne({
            _id : req.params._id
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }
}

module.exports = TransactionController