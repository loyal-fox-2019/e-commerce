const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = require('chai').expect

chai.use(chaiHttp)

describe('route to /users', function() {
    describe('POST /register', function() {
        it('should response with status code 201 when successed', function(done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    email: 'jansen@mail.com',
                    password: '123'
                })
                .then(function(res) {
                    console.log(res.body)
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('user')
                    done()
                })
        })
    })
})