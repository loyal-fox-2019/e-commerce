const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const App = require('../app.js')

describe('AUTH', function () {
  describe('POST /auth/register', function () {
    it.only('should send object with status code 200', function (done) {
      chai
          .request(App)
          .post('/auth/register')
          .send({
            fullname: 'Ahmad muzakki',
            email: 'dzakki@gmail.com',
            password: 'dzakki',
            role: 'admin',
            address: 'jl'
          })
          .then(res => {
            console.log(res.body)
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('token')
            done()
          })
          .catch(err => {
            console.log('error test')
            console.log(err)
          })
    })
  })
  describe('POST /auth/login', function () {
    it.only('should send object with status code 200', function (done) {
      chai
          .request(App)
          .post('/auth/login')
          .send({
            email: 'dzakki@gmail.com',
            password: 'dzakki'
          })
          .then(res => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('token')
            global.token = res.body.token
            done()
          })
          .catch(err => {
            console.log('error test')
            console.log(err)
          })
    })
  })
})