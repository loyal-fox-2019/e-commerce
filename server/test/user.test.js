'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('User Authentication' , function() {
    describe('Register /User', function() {
        it('Should send respond status 201 and registered user', function(done) {
            chai.request(app).post('/user/register').send({email: 'rafael.hrhp@yahoo.com', name: 'Rafael Alviano Dafito', password: 'b1625nfb'})
            .then(res => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.has.property('email');
                expect(res.body.data).to.has.property('name');
                expect(res.body.data).to.has.property('password');
                expect(res.body.data).to.has.property('userType');
                expect(res.body.data.name).to.be.an('string');
                expect(res.body.data.email).to.be.an('string');
                expect(res.body.data.password).to.be.an('string');
                expect(res.body.data.userType).to.be.an('string');
                done();
            })
            .catch(error => {
                console.log(error);
            });
        });
    });
    describe('Login /User', function() {
        it('Should send respond status 200 and user token', function(done) {
            chai.request(app).post('/user/privateAuth').send({email: 'rafael.hrhp@yahoo.com', password: 'b1625nfb'})
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('string');
                expect(res.body.message).to.equal('Login successful');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
});