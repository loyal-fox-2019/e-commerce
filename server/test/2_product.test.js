const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const App = require('../app.js')

describe('CRUD Product', function() {
  describe(`POST /products`, function () {
    it.only(`should send object with status code 201`, function (done) {
      chai
        .request(App)
        .post('/products')
        .set('token', global.token)
        .send({
          name: 'Baju kaos',
          image: 'https://storage.googleapis.com/assets-image/1579493849584-Lorem-Ipsum-alternatives-696x445.png',
          price: 20000,
          stock: 20,
          description: 'cyat',
          seller: '1'
        })
        .then(response => {
          expect(response).to.have.status(201)
          expect(response.body).to.be.an('object')
          expect(response.body).to.include({
            name: 'Baju kaos',
            image: 'https://storage.googleapis.com/assets-image/1579493849584-Lorem-Ipsum-alternatives-696x445.png',
            price: 20000,
            stock: 20,
            description: 'cyat'
          })
          expect(response.body).to.have.property('seller')
          global.productId = response.body._id
          done()
        })
        .catch(err => {
          console.log('error test')
          console.log(err)
        })
    })
  })

  describe('GET /products', function () {
    it.only('should send arrays with status code 200', function (done) {
      chai
        .request(App)
        .get('/products')
        .then(response => {
          expect(response).to.have.status(200)
          expect(response.body).to.be.an('array')
          expect(response.body[0]).to.include({
            name: 'Baju kaos',
            image: 'https://storage.googleapis.com/assets-image/1579493849584-Lorem-Ipsum-alternatives-696x445.png',
            price: 20000,
            stock: 20,
            description: 'cyat'
          })
          done()
        })
        .catch(err => {
          console.log('error test')
          console.log(err)
        })
    })
  })

  describe('PUT /products/:id', function () {
    it.only('should send object with status code 200', function (done) {
      chai
        .request(App)
        .put('/products/'+global.productId)
        .set('token', global.token)
        .send({
          name: 'Baju kaos real',
          image: 'https://storage.googleapis.com/assets-image/1579493849584-Lorem-Ipsum-alternatives-696x445.png',
          price: 21000,
          stock: 21,
          description: 'cyatt',
          seller: '1'
        })
        .then(response => {
          expect(response).to.have.status(200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.include({
            name: 'Baju kaos real',
            image: 'https://storage.googleapis.com/assets-image/1579493849584-Lorem-Ipsum-alternatives-696x445.png',
            price: 21000,
            stock: 21,
            description: 'cyatt'
          })
          expect(response.body).to.have.property('seller')
          done()
        })
        .catch(err => {
          console.log('error test')
          console.log(err)
        })
    })
  })

  describe('GET /products/:id', function () {
    it.only('should send object with status code 200', function (done) {
      chai
        .request(App)
        .get('/products/'+global.productId)
        .then(response => {
          expect(response).to.have.status(200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.include({
            name: 'Baju kaos real',
            image: 'https://storage.googleapis.com/assets-image/1579493849584-Lorem-Ipsum-alternatives-696x445.png',
            price: 21000,
            stock: 21,
            description: 'cyatt'
          })
          expect(response.body).to.have.property('seller')
          done()
        })
        .catch(err => {
          console.log('error test')
          console.log(err)
        })
    })
  })
  describe('DELETE /products/:id', function(){
    it('should send object with status code 200', function(done) {
      chai
        .request(App)
        .delete('/products/'+global.productId)
        .set('token', global.token)
        .then(response => {
          expect(response).to.have.status(200)
          expect(response.body).to.be.an('object')
          expect(response.body).to.include({"ok": 1})
          done()
        })
        .catch(err => {
          console.log('error test')
          console.log(err)
        })
    })
  })
})
