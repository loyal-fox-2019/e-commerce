'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('User Authentication' , function() {
    describe('Register /User', function() {
        it('Should send respond status 201 and registered user', function(done) {
            chai.request(app).post('/user/register').send({email: 'rafael.hrhp@mail.com', name: 'Rafael Alviano Dafito', password: 'b1625nfb'})
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
    describe('Register user with all field empty', function() {
        it('Should send status code 400', function(done) {
            chai.request(app).post('/user/register').send({email: '', name: '', password: ''})
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('array');
                expect(res.body.errors).to.have.lengthOf(3);
                done();
            }) 
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Register user with email that already used', function() {
        it('Should send status code 400', function(done) {
            chai.request(app).post('/user/register').send({email: 'rafael.hrhp123@gmail.com', name: 'Rafael Alviano Dafito', password: 'b1625nfb'})
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('array');
                expect(res.body.errors).to.have.lengthOf(1);
                expect(res.body.errors[0]).to.equal('Email must be unique');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Login /User', function() {
        it('Should send respond status 200 and user token', function(done) {
            chai.request(app).post('/user/privateAuth').send({email: 'dimaspalaguna@gmail.com', password: 'b1625nfb'})
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
    describe('Login with empty email and password', function() {
        it('Should send status 400 and error message incorrect email or password', function(done) {
            chai.request(app).post('/user/privateAuth').send({email: '', password: ''})
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('string');
                expect(res.body.errors).to.equal('Incorrect email or password');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Login with wrong email and password', function() {
        it('Should send status 400 and error message incorrect email or password', function(done) {
            chai.request(app).post('/user/privateAuth').send({email: 'rafael@mail.com', password: 'b1625nfb'})
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('string');
                expect(res.body.errors).to.equal('Incorrect email or password');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Login with corrent email and wrong password', function() {
        it('Should send status 400 and error message incorrect email or password', function(done) {
            chai.request(app).post('/user/privateAuth').send({email: 'rafael.hrhp@gmail.com', password: 'dwadwd'})
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('string');
                expect(res.body.errors).to.equal('Incorrect email or password');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
});