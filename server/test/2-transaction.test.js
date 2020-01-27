const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const { User, Product, Transaction } = require('../models')
const jwt = require('jsonwebtoken')
const invalidToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJlOGM1MjI0OTM2NDE5NDBiN2NkOTIiLCJpYXQiOjE1ODAxMDg4ODJ9.ESIkDLNpph5JeDgfhxgJtFPAeANwdvlp10HSF6Mbt10`
let token = ''
chai.use(chaiHttp)

describe('Testing transaction routes', function () {
  before((done) => {
    User
      .create({ username: 'test', email: 'test@mail.com', password: '123456' })
      .then((response) => {
        console.log('Test user created')
        token = jwt.sign({_id: response._id}, 'jwtsecret')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  })

  after((done) => {
    User
      .deleteMany({})
      .then(() => {
        console.log('Test user deleted')
        return Product
          .deleteMany({})
      })
      .then(() => {
        console.log('Test product deleted')
        return Transaction
          .deleteMany({})
      })
      .then(() => {
        console.log('Test transaction deleted')
        done()
      })
      .catch((err) => {
        console.log(err)
      })  
  })
  describe('POST /transactions', function () {
    describe('Create a transaction without being logged in', function () {
      it('should return jwt malformed message', function (done) {
        chai
          .request(app)
          .post('/transactions')
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
    describe('Create a transaction with invalid user', function () {
      it('should return Invalid Token message', function (done) {
        chai
          .request(app)
          .post('/transactions')
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
    describe('Create a transaction with empty cart', function () {
      it('should return you can\'t check out message', function (done) {
        chai
          .request(app)
          .post('/transactions')
          .set('token', token)
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('You can\'t checkout an empty cart')
            done()
          })
      })
    })
    describe('Create a transaction successfully', function () {
      before((done) => {
        Product
          .create({name: 'test product', price: 8000, stock: 8})
          .then((response) => {
            return User
              .findOneAndUpdate({username: 'test'}, {$set: {cart: [{productId: response._id, quantity: 5}]}}, {new: true})
          })
          .then((user) => {
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      it('should return check out successs message', function (done) {
        chai
          .request(app)
          .post('/transactions')
          .set('token', token)
          .end(function (err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Checkout success')
            done()
          })
      })
    })
  })
})
