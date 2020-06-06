const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const App = require('../app.js')

describe('CRUD User', function () {
  describe('POST /users/isValid', function () {
    it.only('should send an object with status code 200', function (done) {
      chai
        .request(App)
        .post('/users/isvalid')
        .send({
          token: global.token
        })
        .then(res => {
          console.log(res.body)
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('fullname')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('role')
          expect(res.body).to.have.property('_id')
          done()
        })
        .catch(err => {
          console.log(err)
        })

    })
  })
})