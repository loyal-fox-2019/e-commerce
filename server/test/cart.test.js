'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Create and Delete for Cart', function() {
    describe('Test endpoint for add to cart', function() {
        it('Should be send a respond status of 201 and the cart data', function(done) {
            chai.request(app).post('/cart').send({productId: '5e25b0daf7566b302b681b14', amount: 2, userId: '5e2575785974dc20dad0324c'})
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
            chai.request(app).delete('/cart/5e2698a6cac2113cac58cf9d')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.deletedCount).to.equal(1);
                done();
            })
        })
    })
});