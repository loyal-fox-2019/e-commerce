const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

const Product = require('../models/product');
const User = require('../models/user');
const Cart = require('../models/cart');

// global.token -> set global variable buat diambil di file node lain

after(function() {
  Product.deleteMany({})
    .then((result) => {
      console.log('Clean db data product done');
    }).catch((err) => {
      console.log(err);
    });

  User.deleteMany({})
    .then((result) => {
      console.log('Clean db data user done');
    }).catch((err) => {
      console.log(err);
    });

  Cart.deleteMany({})
    .then((result) => {
      console.log('Clean db data cart done');
    }).catch((err) => {
      console.log(err);
    });
});

// Testing on user routes
describe('CRUD User', function() {
  describe('register new user account', function() {
    it('should send an array with 201 status code and return token, name, and userId', function(done) {
      chai
        .request(app)
        .post('/users/register')
        .send({
          fullname: 'Harfi Alfaraby',
          email: 'harfi@mail.com',
          username: 'harfi',
          password: '123456'
        })
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('userId');
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  });

  describe('login on existing user', function() {
    it('should send an object with 200 status code and return token, name, and userId', function(done) {
      chai
        .request(app)
        .post('/users/login')
        .send({
          username: 'harfi',
          password: '123456'
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('userId');
          expect(res.body.name).to.equal('Harfi Alfaraby');
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    })
  });
});

// Testing on product routes
describe('CRUD Product', function() {
  describe('get all products list', function() {
    it('should send an array with 200 status code and list of available products with stock more than 0', function(done) {
      chai
        .request(app)
        .get('/products')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('images');
          expect(res.body).to.have.property('stock');
          expect(res.body).to.have.property('seller');
          expect(res.body).to.have.property('stock');
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  });

  describe('add product', function() {
    it('should send an object with 201 status code and contains product data', function(done) {
      chai
        .request(app)
        .post('/products')
        .send({
          name: 'tas selempang',
          price: 100000,
          stock: 3
        })
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('seller');
          expect(res.body).to.have.property('stock');
          expect(res.body).to.have.property('images');
          expect(res.body.name).to.equal('tas selempang');
          expect(res.body.price).to.equal(100000);
          expect(res.body.stock).to.equal(3);
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    })
  });
});

// Testing on cart routes
describe('CRUD Cart', function() {
  describe('get authenticated user cart list', function() {
    it('should send an array with 200 status code and contains cart list on authenticated user', function(done) {
      chai
        .request(app)
        .get('/carts')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('product');
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('stock');
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  });  
});