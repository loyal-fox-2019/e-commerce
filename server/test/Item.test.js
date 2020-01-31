const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Item = require('../model/Item');
const User = require('../model/User')
const expect = chai.expect;
const { removeAllItem } = require('./testHelper');
const { generateToken } = require('../helper/jwt')
chai.use(chaiHttp);


let initialItem, token, userToken;
let userRegister = {
    username : 'jap',
    firstName : 'jap',
    lastName : 'hendy',
    email : 'jap@mail.com',
    password : '1234'
}


let newItem = {
    name: 'Item Boongan',
    description: 'Description boongan',
    price: 10000,
    stock:100,
}

let falseId = '5d63b24530a316a809302c57'
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJlNTkxNjM0MzJkYTY3ODgxN2RlYzIiLCJpYXQiOjE1ODAyNzQxNTB9.rEQaeazJ_6CQ00wjjtrNWMI2K6u765rD92HtZ73H0zz'



before(function() {
    User.create( userRegister )
    .then(result=>{
        token = generateToken({ _id: result._id })

        return Item.create( newItem )
    })
    .then(result =>{
        initialItem = result
        done()
    })
    .catch(err=>{
        console.log(' error before \n======================\n', err)
    })
})

describe('Item Routes', function() {
    before(function(done){
      chai.request(app)
        .post('/login')
        .send(userRegister)
        .end(function(err, res) {
            userToken = JSON.parse(res.text).token;
            done()
      })
    })
    describe('POST /items', function() {
      describe('success process', function() {
        it('should send an object (_id, name, price, stock) with 200 status code', function(done) {
          chai.request(app)
          .post('/items')
          .send(newItem)
          .set('authentication', token)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'price', 'stock')
            expect(res.body).to.includes({ 
              name: newProduct.name, 
              price: newProduct.price, 
              description: newProduct.description,
              stock: newProduct.stock
            })
            done()
          })
        })
      })
        it('should send an error with 406 status code because missing required value', function(done) {
          const blankItem = {}
          
          chai.request(app)
          .post('/items')
          .send(blankItem)
          .set('authorization', token)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(406)
            expect(res.body).to.be.an('object').to.have.any.keys('message')
            expect(res.body.message).to.be.an('array').that.includes('Please Name your item')
            expect(res.body.message).to.be.an('array').that.includes('Describe Price for your item')
            expect(res.body.message).to.be.an('array').that.includes('How much item is in stock')
            done()
          })
        })
        it('should send an error with 401 status code because token undefined', function(done) {
          chai.request(app)
          .post('/items')
          .send(newItem)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message')
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          })
        })
        it('should send an error with 401 status code because invalid token', function(done) {
          chai.request(app)
          .post('/items')
          .send(newItem)
          .set('authorization', invalidToken)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys('message')
            expect(res.body.message).to.equal('invalid signature')
            done()
          })
        })
      })
    })
    describe('GET /items/all', function() {
      describe('success process', function() {
        it('should send an array of object with 200 status code', function(done) {
          chai.request(app)
          .get('/items/all')
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            done()
          })
        })
      })
    })
    describe('GET /items/:id', function() {
      describe('errors process', function() {
        it('should send an object with message product not found and 404 status code because _id', function(done) {
          chai.request(app)
          .get('/items/' + falseId)
          .end(function(err, res) {
              // console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys('message')
            expect(res.body.message).to.equal('Item not Found')
            done()
          }) 
        })
      })
      describe('success process', function() {
        it('should send correct data with 200 status code', function(done) {
          chai.request(app)
          .get('/items/' + initialItem._id)
          .set('authorization', token)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.any.keys('_id', 'name', 'price', 'stock')
            expect(res.body).to.includes({ 
              _id: String(initialItem._id), 
              name: initialItem.name, 
              price: initialItem.price, 
              description: initialItem.description,
              stock: initialItem.stock
            })
            done()
          })
        })
      })
    })
    describe('DELETE /items/:id', function() {
      describe('errors process', function() {
        it('should send an object with message unauthorized', function(done) {
          chai.request(app)
          .delete('/items/' + initialItem._id)
          .set('authorization', userToken)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('unAuthorized Access.')
            done()
          })
        })
        it('should send an object with message product not found and 404 status code because _id', function(done) {
          chai.request(app)
          .delete('/items/' + falseId)
          .set('authorization', token)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('resource not found')
            done()
          })
        })
        it('should send an error with 500 status code because token undefined', function(done) {
          chai.request(app)
          .delete('/items/' + initialItem._id)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(500)
            expect(res.body).to.be.an('object').to.have.any.keys('message')
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          })
        })
        it('should send an error with 500 status code because invalid token', function(done) {
          chai.request(app)
          .delete('/items/' + initialItem._id)
          .set('authorization', invalidToken)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(500)
            expect(res.body).to.be.an('object').to.have.any.keys('message')
            expect(res.body.message).to.equal('invalid signature')
            done()
          })
        })
      })
      describe('success process', function() {
        it('should send 200 status code', function(done) {
          chai.request(app)
          .delete('/items/' + initialItem._id)
          .set('authorization', token)
          .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
          })
        })
      })
    })