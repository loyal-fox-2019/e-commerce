const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const dropData = require('../helpers/dropData')

before(done => {
    dropData(done)
})
after(done => {
    dropData(done)
})

chai.use(chaiHttp)
describe('User Test',  function() {
    describe('POST /user/register', function() {
        it('should return status 201, register success', function(done) {
            const data = {
                name: 'Admin',
                email: 'admin@mail.com',
                password: 'helloadmin',
            }
            chai.request(app)
                .post('/user/register')
                .send(data)
                .then(result => {
                    expect(result).to.have.status(201)
                    expect(result.body.message).to.equal('User created')
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done()
                })
        })
    })

    describe('POST /user/login', function() {
        it('should return status 200, login success', function(done) {
            const data = {
                email: 'admin@mail.com',
                password: 'helloadmin'
            }
            chai.request(app)
                .post('/user/login')
                .send(data)
                .then(result => {
                    expect(result).to.have.status(200)
                    expect(result.body.message).to.equal('Login success')
                    done()
                })
                .catch(err => {
                    console.log(err)
                    done()
                })
        })
    })
} )
