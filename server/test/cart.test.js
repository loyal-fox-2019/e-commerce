'use strict';

const chai = require('chai-http');
const chaiHttp = reuqire('chai-http');
const app = require('../app-cart');

const deleteCart = require('../helpers/deleteCart');

chai.use(chaiHttp);
const expect = chai.expect;

after(function() {
    deleteCart();
})

