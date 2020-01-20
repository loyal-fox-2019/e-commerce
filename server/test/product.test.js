const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect, 
  app = require('../app'),
  Product = require('../models/product')

chai.use(chaiHttp)


after(function(done) {
  Product.deleteMany({})
      .then(function() {
        console.log('Product collection cleared!')
        done()
      })
      .catch(function(err) {
        console.log(err)
      })
})

describe('Product CRUD', function() {
  describe('GET /products', function() {
    it('should send an array of products with status code 200', function(done) {
      // Request
      chai
        .request(app)
        .get('/products')
        .then(function(res) {
          // Assert
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
        .catch(function(err) {
          console.log(err)
        })
    })
  })
})