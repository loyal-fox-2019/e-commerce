const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

describe('CRUD Cart', function () {
  
  describe('POST /carts', function () {
    it('should send object with status code 201', function (done) {
      chai
      .request(App)
      .post('/carts')
      .send({
        product: global.productId,
        amount: 1,
        totalPrice: 21000
      })
      .set('token', global.token)
      .then(res => {
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.include({
          product: global.productId,
          amount: 1,
          totalPrice: 21000
        })
        expect(res.body).to.have.property('costumer')
        global.cartId = res.body._id
        done()
      })
      .catch(err => {
        console.log(err)
      })
    })
  })

  describe('GET /carts', function () {
    it('should send array and status code 200', function (done) {
      chai
        .request(App)
        .get('/carts')
        .set('token', global.token)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.include({
            product: global.productId,
            amount: 1,
            totalPrice: 21000
          })
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe('PACTH /carts/amount/id', function () {
    it('should send object and status code 200', function (done) {
      chai
      .request(App)
      .patch('/carts/'+global.cartId)
      .send({
        amount: 2,
      })
      .set('token', global.token)
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.include({
          product: global.productId,
          amount: 1,
          totalPrice: 21000
        })
        expect(res.body).to.have.property('costumer')
        done()
      })
      .catch(err => {
        console.log(err)
      })
    })
  })

  describe('GET /carts/id', function () {
    it('should send object and status code 200', function (done) {
      chai
      .request(App)
      .get('/carts/amount/'+global.cartId)
      .set('token', global.token)
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.include({
          product: global.productId,
          amount: 1,
          totalPrice: 21000
        })
        expect(res.body).to.have.property('costumer')
        done()
      })
      .catch(err => {
        console.log(err)
      })
    })
  })

  describe('DELETE /carts/id', function () {
    it('should send object and status code 200', function (done) {
      chai
      .request(App)
      .delete('/carts/amount/'+global.cartId)
      .set('token', global.token)
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.include({"ok": 1})
        done()
      })
      .catch(err => {
        console.log(err)
      })
    })
  })
})