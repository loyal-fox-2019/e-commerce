'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Product CRUD', function() {
    describe('Test create endpoint', function() {
        it('Should send respond status 201 and created product', function(done) {
            chai.request(app).post('/product').send({file: 'https://storage.googleapis.com/mini-wp-upload-image/1580044748007-adv1_adv7.jpg', 
            brand: 'Forgiato', type: 'Alneto', description: "This wheels are great", stock: 100, price: 1900000})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwMzIxMX0.Plaj3PxQScy_6YFFGmAGFbsPgZjBP5XS12iMuDxXqnw')
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
    describe('Test create endpoint with normal user', function() {
        it('Should send respond 403 and received message Access denied, you dont have permission to access this page', function(done) {
            chai.request(app).post('/product').send({productImage: 'Image',
            brand: 'Forgiato', type: 'Alneto', description: "This wheels are great", stock: 100, price: 1900000})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQxYzI3NzRlN2I2MDZjOTkxNDQ3NSIsImlhdCI6MTU4MDM5ODg4OH0.ZWyt4xbPxJDaXxrluWnqb8AlFWlekKL-6WIPXfb7dsw')
            .then(res => {
                expect(res).to.have.status(403);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.an('string');
                expect(res.body.message).to.equal('Access denied, you dont have permission to access this page');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Test create endpoint with all field empty', function() {
        it('Should send respond 400 and recieved array of messages', function(done) {
            chai.request(app).post('/product').send({file: '', 
            brand: '', type: '', description: "", stock: '', price: ''})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwMzIxMX0.Plaj3PxQScy_6YFFGmAGFbsPgZjBP5XS12iMuDxXqnw')
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('array');
                expect(res.body.errors).to.have.lengthOf(5);
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
    describe('Test readOne endpoint', function() {
        it('Should respond 200 status code and show one product', function(done) {
            chai.request(app).get('/product/5e2d94a036be0218892d8878')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
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
    describe('Test update endpoint', function() {
        it('Should respond 200 status code and nModified has a value of 1', function(done) {
            chai.request(app).put('/product/5e3307b1d4ad4779e25cab59').send({brand: 'Forgiato', 
            type: 'Alneto', description: "This wheels are great", stock: 200, price: 1900000})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwMzIxMX0.Plaj3PxQScy_6YFFGmAGFbsPgZjBP5XS12iMuDxXqnw')
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
        it('Should respond 200 status code and deletedCount has a value of 1', function(done) {
            chai.request(app).delete('/product/5e3307b1d4ad4779e25cab59')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwMzIxMX0.Plaj3PxQScy_6YFFGmAGFbsPgZjBP5XS12iMuDxXqnw')
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