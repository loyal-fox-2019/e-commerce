const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

const Product = require('../models/product');

// global.token -> set global variable buat diambil di file node lain

after(function() {
  Product.deleteMany({})
    .then((result) => {
      console.log('Clean db data done');
    }).catch((err) => {
      console.log(err);
    });
});

describe('CRUD Product', function() {
  describe('GET /products', function() {
    it('should send an array with 200 status code', function(done) {
      chai
        .request(app)
        .get('/products')
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

  describe('POST /products', function() {
    it('should send an object with 201 status code', function(done) {
      chai
        .request(app)
        .post('/products')
        .send({
          name: 'glasses',
          price: 2000000,
          seller: '12309810j293801sn23123',
          stock: 20
        })
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('seller');
          expect(res.body).to.have.property('stock');
          expect(res.body).to.have.property('message');
          expect(res.body.name).to.equal('glasses');
          expect(res.body.price).to.equal(2000000);
          expect(res.body.seller).to.equal('12309810j293801sn23123');
          expect(res.body.message).to.equal('Product registered successfully');
          expect(res.body.stock).to.equal(20);
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    })
  });

  describe('PUT /products', function() {
    it('should send an object with 200 status code and return updated product data', function(done) {
      chai
        .request(app)
        .put('/products/')
        .send({
          name: 'glasses',
          price: 2000000,
          seller: '12309810j293801sn23123',
          stock: 20
        })
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('seller');
          expect(res.body).to.have.property('stock');
          expect(res.body).to.have.property('message');
          expect(res.body.name).to.equal('glasses');
          expect(res.body.price).to.equal(2000000);
          expect(res.body.seller).to.equal('12309810j293801sn23123');
          expect(res.body.message).to.equal('Product registered successfully');
          expect(res.body.stock).to.equal(20);
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    })
  });
});