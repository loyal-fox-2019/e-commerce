const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const app = require("../app");

let soapId;
describe('Products CRUD', function() {
    describe('Insert product (POST /products)', function() {
        it('should respond with a Product instance including an id, with 200 status code when inserting soap with price 5000', function(done) {
            chai.request(app)
            .post('/products')
            .send({
                name: "soap",
                price: 5000
            })
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body.name).to.equal('soap');
                expect(res.body.price).to.equal(5000);
                soapId = res.body._id;

                done();
            })
            .catch(function(err) {
                console.log(err);                
            })
        });
    });

    describe('List products (GET /products)',function() {
        it('should respond with an array of products, including the soap with price 5000, with status code 200', function(done) {
            chai.request(app)
            .get('/products')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('name');
                expect(res.body[0]).to.have.property('price');
                expect(res.body[0]._id).to.equal(soapId);
                expect(res.body[0].name).to.equal('soap');
                expect(res.body[0].price).to.equal(5000);


                done();
            })
            .catch(function(err) {
                console.log(err);                
            })

            done();
        })
    });

    describe('Get product information from product _id (GET /products/:id)',function() {
        it('should respond with a Product instance with 200 status code of the soap with price 5000 inserted earlier',function(done) {
            chai.request(app)
            .get(`/products/${soapId}`)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body.name).to.equal('soap');
                expect(res.body.price).to.equal(5000);

            })
            .catch(function(err) {
                console.log(err);                
            })

            done();
        });
    });

    describe('Delete product (DELETE /products/:id)',function() {
        it('should respond with a status code 204 on successful deletion',function(done) {
            chai.request(app)
            .delete(`/products/${soapId}`)
            .then(function(res) {
                expect(res).to.have.status(204);
            })
            .catch(function(err) {
                console.log(err);                
            });
            
            done();
        })

        it('deleted product should not be found (status code 404)',function(done) {
            chai.request(app)
            .get(`/products/${soapId}`)
            .then(function(res) {
                expect(res).to.have.status(404);
            })
            .catch(function(err) {
                console.log(err);                
            })

            done();
        })
    })

});
