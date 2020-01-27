'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portofolioSchema = new Schema({
    image: {
        type: String,
        required: [true, 'Image field cannot be empty']
    },
    description: {
        type: String,
        required: [true, 'Description field cannot be empty']
    }
})

const Portofolio = mongoose.model('Portofolio', portofolioSchema);

module.exports = Portofolio;