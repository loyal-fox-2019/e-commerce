'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Create and Delete for Cart', function() {
    describe('Test endpoint for add to cart', function() {
        it('Should be send a respond status of 201 and the cart data', function(done) {
            chai.request(app).post('/cart').send({productId: '5e3304befa16ff7852febb04', amount: 2})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQxYzI3NzRlN2I2MDZjOTkxNDQ3NSIsImlhdCI6MTU4MDM5ODg4OH0.ZWyt4xbPxJDaXxrluWnqb8AlFWlekKL-6WIPXfb7dsw')
            .then(res => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('productId');
                expect(res.body.data).to.have.property('amount');
                expect(res.body.data).to.have.property('userId');
                expect(res.body.data).to.have.property('status');
                expect(res.body.data.amount).to.be.an('number');
                expect(res.body.data.status).to.be.an('boolean');
                done();
            })
            .catch(error => {
                console.log({error});
            });
        });
    });
    describe('Test endpoind for remove from cart', function() {
        it('Should be send a respond status of 200 and deletedCount has a value of 1', function(done) {
            chai.request(app).delete('/cart/5e330b761ec8d97b49ed55ed')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQxYzI3NzRlN2I2MDZjOTkxNDQ3NSIsImlhdCI6MTU4MDM5ODg4OH0.ZWyt4xbPxJDaXxrluWnqb8AlFWlekKL-6WIPXfb7dsw')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.deletedCount).to.equal(1);
                done();
            })
        })
    })
});