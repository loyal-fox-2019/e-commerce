'use strict';

const Portofolio = require('../models/portofolio');

class PortoflioController {
    static create(req, res, next ) {
        const newPortofolio = {
            image: req.body.file, 
            description: req.body.description
        }
        Portofolio.create(newPortofolio)
        .then(portofolio => {
            res.status(201).json({
                message: 'New portofolio has been created',
                data: portofolio
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static read(req, res, next) {
        Portofolio.find()
        .then(portofolios => {
            res.status(200).json({
                message: 'OK',
                data: portofolios
            });
        })
        .catch(error => {
            next(error);
        })
    }
}

module.exports = PortoflioController