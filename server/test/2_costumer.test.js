const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const App = require('../app')
chai.use(chaiHttp);

describe('Customer Authentication', function () {  
    describe('POST /register', function () {  
        it.only('should send an object with status 200', function (done) {  
            chai
                .request(App)
                .post('/auth/register')
                .send({
                    username: 'dzakki',
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
                    console.log(err)
                })
        })
    })
    describe('POST /login', function () {  
        it.only('should send an object with status 200', function (done) {  
            chai
                .request(App)
                .post('/auth/login')
                .send({
                    username: 'dzakki',
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
                    console.log(err)
                })
        })
    })
})
