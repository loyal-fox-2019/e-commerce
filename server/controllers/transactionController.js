const Transaction = require('../models/transaction')

class transactionController {
    static sell (req,res,next ) {
        Transaction.find({seller:req.decoded.id})
            .populate('seller')
            .populate('buyer')
            .populate('item')
            .then( data => res.status(200).json(data))
            .catch( next )
    }
    
    static buy (req,res,next ) {
        Transaction.find({buyer:req.decoded.id})
            .populate('seller')
            .populate('buyer')
            .populate('item')
            .then( data => res.status(200).json(data))
            .catch( next )
    }

    static updateStatus ( req,res,next ) {
        Transaction.updateOne({_id: req.params.id},{
            $set: {status : req.body.status}
        })
            .then( result => res.status(201).json(result))
            .catch(next)
    }

    static get ( req,res,next ) {
        Transaction.find({})
            .populate('seller')
            .populate('buyer')
            .populate('item')
            .then( result => res.status(200).json(result))
            .catch( next )
    }
}

module.exports = transactionController