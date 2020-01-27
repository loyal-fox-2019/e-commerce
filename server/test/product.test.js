'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Product CRUD', function() {
    describe('Test create endpoint', function() {
        it('Should send respond status 201 and created product', function(done) {
            chai.request(app).post('/product').send({productImage: 'Image', detailImage: 'Image', 
            brand: 'Forgiato', type: 'Alneto', description: "This wheels are great", stock: 100, price: 1900000}).headers({})
            .then(res => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('productImage');
                expect(res.body.data).to.have.property('brand');
                expect(res.body.data).to.have.property('type');
                expect(res.body.data).to.have.property('description');
                expect(res.body.data).to.have.property('stock');
                expect(res.body.data).to.have.property('price');
                expect(res.body.data.productImage).to.be.an('string');
                expect(res.body.data.brand).to.be.an('string');
                expect(res.body.data.type).to.be.an('string');
                expect(res.body.data.description).to.be.an('string');
                expect(res.body.data.stock).to.be.an('number');
                expect(res.body.data.price).to.be.an('number');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Test read endpoint', function() {
        it('Should respond 200 status code and show all products', function(done) {
            chai.request(app).get('/product')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('OK');
                expect(res.body.data).to.be.an('array');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Test update endpoint', function() {
        it('Should respond 200 status code and nModified has a value of 1', function(done) {
            chai.request(app).put('/product/5e2c649d9ccb3c88a75e124b').send({brand: 'Forgiato', 
            type: 'Alneto', description: "This wheels are great", stock: 200, price: 1900000})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.nModified).to.equal(1);
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Test delete endpoint', function() {
        it('Should respond 200 status code and nModified has a value of 1', function(done) {
            chai.request(app).delete('/product/5e25b0b775cbad300e064ce4')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.deletedCount).to.equal(1);
                done();
            }) 
            .catch(error => {
                console.log(error);
            })
        })
    })
})