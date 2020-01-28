'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const User = require("../models/user")
const app = require('../app')

chai.use(chaiHttp)

describe('user', function() {
    before(function(){
        User
        .deleteMany({name: 'mustaqin ishak'})
        .then(function() {
          console.log('User collection cleared!');
        })
        .catch(function(err) {
          console.log(err);
        });
    })
    describe('POST /register', function(){
        it('should return string with 200 status code', function(done) {
            chai
                .request(app)
                .post('/register')
                .send({name: 'mustaqin ishak', email: 'mustaqinishak0@gmail.com', password: 'takin230793'})
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('password');
                    done()
                })
                .catch(done)
        })
    })
})