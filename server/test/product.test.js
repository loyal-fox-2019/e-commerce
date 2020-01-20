'use strict';
if (process.env.NODE_ENV === 'test') require('dotenv').config();

const { Product } = require('../models');
const app = require('../app');
const Chai = require('chai');
const chaiHttp = require('chai-http');
const expect = Chai.expect;
let productId = null

Chai.use(chaiHttp);

describe('## Product ##', function () {
  after(async function() {
    await Product.deleteMany();
  })
  before(async function() {
    const docs = {
      name: 'AK-47 | Asiimov',
      image: 'https://csgostash.com/img/skins/large_1920/s1052.png',
      wear: 'Factory New',
      price: 2270997,
      stock: 5,
    };
    const response = await Product.create(docs);
    const { id } = response;
    productId = id;
  })


  describe('# POST /products', function() {
    it('Should create new product, status: 201', async function() {
      const product = {
        name: 'M4A4 | Evil Daimyo',
        image: 'https://csgostash.com/img/skins/large_1920/s576.png',
        wear: 'Factory New',
        price: 107740,
        stock: 10,
      };

      const response = await Chai
        .request(app)
        .post('/products')
        .send(product)
      expect(response).to.have.status(201);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.equal(product.name);
    });
    it('Send error when fields are empty, status: 400', async function() {
      const product = {
        name: null,
        image: null,
        wear: null,
        price: null,
        stock: null,
      };

      const response = await Chai
        .request(app)
        .post('/products')
        .send(product)

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.have.lengthOf(5);
      expect(response.body.errors).to.include('Product name cannot be empty');
      expect(response.body.errors).to.include('Product image cannot be empty');
      expect(response.body.errors).to.include('Product wear cannot be empty');
      expect(response.body.errors).to.include('Product price cannot be empty');
      expect(response.body.errors).to.include('Product stock cannot be empty');
    });
    it('Send error if price is string, status: 400', async function () {
      const product = {
        name: 'M4A4 | Evil Daimyo',
        image: 'https://csgostash.com/img/skins/large_1920/s576.png',
        wear: 'Factory New',
        price: 'sepuluh',
        stock: 10,
      };
      const response = await Chai
        .request(app)
        .post('/products')
        .send(product)

      expect(response).to.have.status(400);
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.have.lengthOf(1);
    })
    it('Send error if stock is string, status: 400', async function () {
      const product = {
        name: 'M4A4 | Evil Daimyo',
        image: 'https://csgostash.com/img/skins/large_1920/s576.png',
        wear: 'Factory New',
        price: 1231024,
        stock: 'sepuluh',
      };
      const response = await Chai
        .request(app)
        .post('/products')
        .send(product)

      expect(response).to.have.status(400);
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.have.lengthOf(1);
    })
  })


  describe('# PATCH /products/:id/stock/add', function() {
    it('Should add product stock, status: 200', async function() {
      const stock = 5;
      const response = await Chai
        .request(app)
        .patch(`/products/${productId}/stock/add`)
        .send({stock});

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('stock');
      expect(response.body.stock).to.be.a('Number');
    })
    it('Send error when product not found, status: 404', async function() {
      const stock = 5;
      const response = await Chai
        .request(app)
        .patch(`/products/5e25652f074761657c144390/stock/add`)
        .send({stock});

      expect(response).to.have.status(404);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('Product not found')
    })
  })

  
  describe('# PACTH /products/:id/stock/subtract', function() {
    it('Should subtract product stock, status: 200', async function() {
      const stock = 2;
      const response = await Chai
        .request(app)
        .patch(`/products/${productId}/stock/subtract`)
        .send({stock})
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('stock');
      expect(response.body.stock).to.be.a('Number');
    })

    it('Should error when stock is below, status: 400', async function() {
      const stock = 20;
      const response = await Chai
        .request(app)
        .patch(`/products/${productId}/stock/subtract`)
        .send({stock})
      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('insufficient stock')
    })
    it('Send error when product not found, status: 404', async function() {
      const stock = 5;
      const response = await Chai
        .request(app)
        .patch(`/products/5e25652f074761657c144390/stock/subtract`)
        .send({stock});

      expect(response).to.have.status(404);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('Product not found')
    })
  })


  describe('# DELETE /products/:id', function() {
    it('Should delete product, status: 200', async function() {
      const response = await Chai
        .request(app)
        .delete(`/products/${productId}`)

      expect(response).to.have.status(200);
    })

    it('Should error when product not found, status: 404', async function() {
      const response = await Chai
        .request(app)
        .delete(`/products/5e25652f074761657c144390`)

      expect(response).to.have.status(404);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('Product not found')
    })
  })
})