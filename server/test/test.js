const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

const expect = chai.expect

after(function() {
  User.deleteMany({})
    .then(() => {
      console.log('Data has been cleared')
    })
    .catch((err) => {
      console.log(err)
    })
})

// Users
describe('Test users routing', function() {
  // test create user
  describe('Test create user', function() {
    // Success
    describe('Success', function() {
      it('Should return status 201 and created user object', function(done) {
        chai
          .request(app) // buat app
          .post('/users/register') // buat method dan url
          .send({
            username: 'tester',
            email: 'tester@test.com',
            password: 'tester123'
          })
          .then(function(res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.own.property('_id')
            expect(res.body).to.own.property('username')
            expect(res.body).to.own.property('email')
            expect(res.body).to.own.property('password')
            done()
          })
          .catch(function(err) {
            console.log(err)
          })
      })
    })
    // end of success scenario
  })
  // end of test create user
  describe('Test login user', function() {
    describe('Success', function() {
      it.only('Should return response with status 200 and access token', function(done) {
        chai
          .request(app)
          .post('/users/login')
          .send({
            username: 'tester',
            email: 'tester@test.com',
            password: 'tester123'
          })
          .then((res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.own.property('token')
            done()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  })
})
// End of users test
