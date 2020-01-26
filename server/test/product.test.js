require('./user.test')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { readFileSync } = require('fs')
chai.use(chaiHttp)

var customerToken
var adminToken
var productId
var transactionId
let file = readFileSync('./test/test.png')

describe('Product Testing', function() {
  describe('simulate admin and customer login', function() {
    it('should loged customer in succesfylly with status code 200', function(done) {
      let user = {
        email: 'samuelzega9@gmail.com',
        password: 'password'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .then(result => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.keys('token')
          customerToken = result.body.token
          // console.log(customerToken)
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })

    it('should loged admin succesfylly with status code 200', function(done) {
      let user = {
        email: 'admin@mail.com',
        password: 'password'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .then(result => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.keys('token')
          adminToken = result.body.token
          // console.log(adminToken)
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })
  })

  describe('POST /products', function() {
    it('should succes create a product with status code 201', function(done) {
      //   let newProduct = {
      //     name: 'Sepatu',
      //     price: 1200000,
      //     stock: 5,
      //     category: 'keyboard',
      //     description:
      //       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
      //   }
      chai
        .request(app)
        .post('/products')
        .set({ token: adminToken })
        .attach('file', file, 'test.png')
        .field('name', 'Roland RD 700 nx')
        .field('price', '22000000')
        .field('stock', '5')
        .field('category', 'keyboard')
        .field(
          'description',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        )
        .then(result => {
          // console.log(result.body)
          productId = result.body._id
          expect(result).to.have.status(201)
          expect(result.body.name).to.equal('Roland RD 700 nx')
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })
  })

  describe('GET /products', function() {
    it('should succes get all product with status code 200', function(done) {
      chai
        .request(app)
        .get('/products')
        .then(result => {
          //   console.log(result.body)
          expect(result).to.have.status(200)
          expect(result.body).to.be.an('array')
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })
  })

  describe('PATCH /products/:productId', function() {
    it('should success to delete one product with status code 200', function(done) {
      chai
        .request(app)
        .patch(`/products/${productId}`)
        .set({ token: adminToken })
        .attach('file', file, 'test2.png')
        .field('name', 'Yamaha Montage')
        .field('price', '34000000')
        .field('stock', '2')
        .field('category', 'keyboard')
        .field(
          'description',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        )
        .then(result => {
          console.log(result.body)
          // expect(result.body.message).to.equal('Delete Success')
          done()
        })
        .catch(err => {
          console.log('dapet dari sini', err)
          done()
        })
    })
  })

  describe('POST /transactions/:productId', function() {
    it('should success to delete one product with status code 200', function(done) {
      let transaction = {
        count: 3
      }
      chai
        .request(app)
        .post(`/transactions/${productId}`)
        .set({ token: customerToken })
        .send(transaction)
        .then(result => {
          transactionId = result.body._id
          // console.log(result.body)
          // expect(result.body.message).to.equal('Delete Success')
          done()
        })
        .catch(err => {
          console.log('dapet dari sini', err)
          done()
        })
    })
  })

  describe('GET /transactions', function() {
    it('should success to get all product with message', function(done) {
      chai
        .request(app)
        .get('/transactions')
        .set({ token: adminToken })
        .then(result => {
          // console.log(result.body)
          // expect()
          done()
        })
        .catch(err => {
          console.log('dapet dari sini', err)
          done()
        })
    })
  })

  describe('GET /transactions/user', function() {
    it('should success to get user transactions', function(done) {
      chai
        .request(app)
        .get('/transactions/user')
        .set({ token: customerToken })
        .then(result => {
          // console.log(result.body)
          done()
        })
        .catch(err => {
          console.log('dapet dari sini', err)
          done()
        })
    })
  })

  describe('PATCH /transactions/user', function() {
    it('should success to patch transaction', function(done) {
      let newTransaction = {
        status: 'send'
      }
      chai
        .request(app)
        .patch(`/transactions/${transactionId}`)
        .set({ token: adminToken })
        .send(newTransaction)
        .then(result => {
          console.log(result.body)
          done()
        })
        .catch(err => {
          console.log('dapet dari sini', err)
          done()
        })
    })
  })

  describe('DELETE /products/:productId', function() {
    it('should success to delete one product with message Delete Success', function(done) {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set({ token: adminToken })
        .then(result => {
          expect(result.body.message).to.equal('Delete Success')
          done()
        })
        .catch(err => {
          console.log('dapet dari sini', err)
          done()
        })
    })
  })
})
