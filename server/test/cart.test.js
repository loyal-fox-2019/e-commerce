'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app-cart');

const deleteCart = require('../helpers/deleteCart');

chai.use(chaiHttp);
const expect = chai.expect;

const cartObj = {
    ProductId: ("6e243323b1155a4fa129cb8c"),
    UserId: ("6e243323b1155a4fa129cb8c"),
    date_cart: new Date,
    quantity: 100,
    sale_price: 1000,
    status: 'process',
    sub_total: 100000
}

after(function() {
    deleteCart();
})

let id = '';
describe('Cart CRUD', function() {
    describe('POST /cart', function() {
        it('should send an array with 201 status code', function(done) {
            chai
            .request(app)
            .post('/cart')
            .send(cartObj)
            .then(function(res) {
                id = res.body._id;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('ProductId');
                expect(res.body).to.have.property('UserId');
                expect(res.body).to.have.property('date_cart');
                expect(res.body).to.have.property('quantity');
                expect(res.body).to.have.property('sale_price');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('sub_total');
                expect(res.body.ProductId).to.equal('6e243323b1155a4fa129cb8c');
                expect(res.body.UserId).to.equal('6e243323b1155a4fa129cb8c');
            //   expect(res.body.date_cart).to.equal('');
                expect(res.body.quantity).to.equal(100);
                expect(res.body.sale_price).to.equal(1000);
                expect(res.body.status).to.equal('process');
                expect(res.body.sub_total).to.equal(100000);
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });
    describe('DELETE /cart', function() {
        console.log('id del : ',id)
        it('should send an array with 200 status code', function(done) {
            chai
            .request(app)
            .delete(`/cart/${id}`)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });
});