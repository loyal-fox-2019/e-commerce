const chai = require('chai')
const chaiHttp = require('chai-http')
const Product = require('../models/Product')
const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

before(function(done) {
  Product.create({
    name: 'Sepatu',
    price: 2000000,
    stock: 10,
    image: 'https://picsum.photos/200/300'
  })
    .then(() => {
      console.log('test product created')
      done()
    })
    .catch(console.log)
});

after(function(done) {
  Product.deleteMany()
    .then(() => {
      console.log('test product deleted')
      done()
  })
    .catch(console.log)
});

describe('/products', function() {

  describe('GET /products', function(done) {
    it('should return status 200 array of object', function(done) {
      chai.request(app)
        .get('/products')
        .end(function(err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.an('object')
          expect(res.body[0].name).to.equal('Sepatu')
          expect(res.body[0].price).to.equal(2000000)
          expect(res.body[0].stock).to.equal(10)
          expect(res.body[0].image).to.equal('https://picsum.photos/200/300')
          done()
        })
    })
  })

  // describe('PUT /products/:id', function(done) {
  //   let dummyProduct = null
  //   before(function(done) {
  //     Product.create({
  //       name: 'Sepatu baru',
  //       price: 1500000,
  //       stock: 10,
  //       image: 'dummy image'
  //     })
  //       .then(result => {
  //         dummyProduct = result
  //         done()
  //       })
  //       .catch(console.log)
  //   })

  //   it('should return status 200 and object of updated item', function(done) {
  //     chai.request(app)
  //       .put(`/products/${dummyProduct.id}`)
  //       .send({
  //         name: 'Sepatu lama',
  //         stock: 9,
  //         price: 1250000,
  //         image: 'change dummy image'
  //       })
  //       .end(function(err, res) {
  //         expect(res).to.have.status(200)
  //         expect(res.body).to.be.an('object')
  //         done()
  //       })

  //   })
  // })

  // describe('DELETE /products/:id', function(done) {
  //   let dummyProduct = null

  //   before(function(done) {
  //     Product.create({
  //       name: 'Sepatu baru',
  //       stock: 10,
  //       price: 1500000,
  //       image: 'dummy image',
  //     })
  //       .then(result => {
  //         dummyProduct = result
  //         done()
  //       })
  //       .catch(err => console.log(err))
  //   })

  //   it('should return status 200 and json object of deleted item', function(done) {
  //     chai.request(app)
  //       .delete(`/products/${dummyProduct.id}`)
  //       .end(function(err, res) {
  //         expect(res).to.have.status(200)
  //         expect(res.body).to.be.an('object')
  //         done()
  //       })
  //   })
  // })
})