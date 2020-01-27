const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const { User, Product } = require('../models')
const jwt = require('jsonwebtoken')
const invalidToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJlOGM1MjI0OTM2NDE5NDBiN2NkOTIiLCJpYXQiOjE1ODAxMDg4ODJ9.ESIkDLNpph5JeDgfhxgJtFPAeANwdvlp10HSF6Mbt10`
let token = ''
let productId = ''
chai.use(chaiHttp)

describe('Testing product routes', function () {
  before((done) => {
    User
      .create({ username: 'test', email: 'test@mail.com', password: '123456' })
      .then((response) => {
        console.log('Product test user created')
        token = jwt.sign({_id: response._id}, 'jwtsecret')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })

  describe('POST /products', function () {
    describe('Create a product without being logged in', function () {
      it('should return jwt malformed message', function (done) {
        chai
          .request(app)
          .post('/products')
          .send()
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          })
      })
    })
    describe('Create a product with invalid user', function () {
      it('should return Invalid Token message', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('token', invalidToken)
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Invalid Token')
            done()
          })
      })
    })
    describe('Create a product without name, price, stock', function () {
      it('should return a message with required field', function (done) {
        chai
          .request(app)
          .post('/products')
          .set('token', token)
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.include('Product name is required')
            expect(res.body.message).to.include('Product price is required')
            expect(res.body.message).to.include('Product stock is required')
            done()
          })
      })
    })
    describe('Create a product successfully', function () {
      it('should return newly created product object', function (done) {
        let productObj = {name: 'test product', price: 8000, stock: 8}
        chai
          .request(app)
          .post(`/products`)
          .set('token', token)
          .send(productObj)
          .end(function (err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name')
            expect(res.body).to.have.property('price')
            expect(res.body).to.have.property('stock')
            expect(res.body.name).to.equal('test product')
            expect(res.body.price).to.equal(8000)
            expect(res.body.stock).to.equal(8)
            productId = res.body._id
            done()
          })
      })
    })
    describe('Edit a product successfully', function () {
      it('should return newly edited product object', function (done) {
        let productObj = {name: 'edit product', price: 88000, stock: 88}
        chai
          .request(app)
          .patch(`/products/${productId}`)
          .set('token', token)
          .send(productObj)
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name')
            expect(res.body).to.have.property('price')
            expect(res.body).to.have.property('stock')
            expect(res.body.name).to.equal('edit product')
            expect(res.body.price).to.equal(88000)
            expect(res.body.stock).to.equal(88)
            done()
          })
      })
    })
    describe('Get a product detail successfully', function () {
      it('should return a product object', function (done) {
        chai
          .request(app)
          .get(`/products/${productId}`)
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name')
            expect(res.body).to.have.property('price')
            expect(res.body).to.have.property('stock')
            expect(res.body.name).to.equal('edit product')
            expect(res.body.price).to.equal(88000)
            expect(res.body.stock).to.equal(88)
            done()
          })
      })
    })
    describe('Get current user\'s products', function () {
      it('should return an array of product object', function (done) {
        chai
          .request(app)
          .get(`/products/myItem`)
          .set('token', token)
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.have.property('name')
            expect(res.body[0]).to.have.property('price')
            expect(res.body[0]).to.have.property('stock')
            expect(res.body[0].name).to.equal('edit product')
            expect(res.body[0].price).to.equal(88000)
            expect(res.body[0].stock).to.equal(88)
            done()
          })
      })
    })
    describe('Get products posted by another user', function () {
      let tokenUser2 = ''
      before((done) => {
        User
          .create({username: 'test2', email: 'test2@mail.com', password: '123456' })
          .then((response) => {
            tokenUser2 = jwt.sign({_id: response._id}, 'jwtsecret')
            console.log('Product test user 2 created')
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      it('should return an array of product object', function (done) {
        chai
          .request(app)
          .get(`/products/othersItem`)
          .set('token', tokenUser2)
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.have.property('name')
            expect(res.body[0]).to.have.property('price')
            expect(res.body[0]).to.have.property('stock')
            expect(res.body[0].name).to.equal('edit product')
            expect(res.body[0].price).to.equal(88000)
            expect(res.body[0].stock).to.equal(88)
            done()
          })
      })
    })
    describe('Delete a product posted by current user', function () {
      it('should return the deleted product object', function (done) {
        chai
          .request(app)
          .delete(`/products/${productId}`)
          .set('token', token)
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name')
            expect(res.body).to.have.property('price')
            expect(res.body).to.have.property('stock')
            expect(res.body.name).to.equal('edit product')
            expect(res.body.price).to.equal(88000)
            expect(res.body.stock).to.equal(88)
            done()
          })
      })
    })
  })
  after((done) => {
    User
      .deleteMany({})
      .then(() => {
        console.log('Product test user deleted')
        done()
      })
      .catch((err) => {
        console.log(err)
      })  
  })
  after((done) => {
    Product
      .deleteMany({})
      .then(() => {
        console.log('Test product deleted')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })
})
