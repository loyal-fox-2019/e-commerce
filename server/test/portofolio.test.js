'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Portoflio post and get', function() {
    describe('Testing create new portolio', function() {
        it('Should received status of 201 and new portofolio data', function(done) {
            chai.request(app).post('/portofolio').send({file: 'image', description: 'Bmw with fucking wheels'})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwMzIxMX0.Plaj3PxQScy_6YFFGmAGFbsPgZjBP5XS12iMuDxXqnw')
            .then(res => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('image');
                expect(res.body.data).to.have.property('description');
                expect(res.body.data.image).to.be.an('string');
                expect(res.body.data.description).to.be.an('string');
                done();
            })
            .catch(error => {
                console.log(error);
            });
        });
    });
    describe('Test create endpoint with normal user', function() {
        it('Should send respond 403 and received message Access denied, you dont have permission to access this page', function(done) {
            chai.request(app).post('/portofolio').send({file: 'image', description: 'Bmw with fucking wheels'})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQxYzI3NzRlN2I2MDZjOTkxNDQ3NSIsImlhdCI6MTU4MDM5ODg4OH0.ZWyt4xbPxJDaXxrluWnqb8AlFWlekKL-6WIPXfb7dsw')
            .then(res => {
                expect(res).to.have.status(403);
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.be.an('string');
                expect(res.body.message).to.equal('Access denied, you dont have permission to access this page');
                done();
            })
            .catch(error => {
                done();
            })
        })
    })
    describe('Test create endpoint with fields empty', function() {
        it('Should send status code 400 and array of messages', function(done) {
            chai.request(app).post('/portofolio').send({file: '', description: ''})
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzMwODk0NmJkMjg2N2E2Njc1YmRhZCIsImlhdCI6MTU4MDQwMzIxMX0.Plaj3PxQScy_6YFFGmAGFbsPgZjBP5XS12iMuDxXqnw')
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.errors).to.be.an('array');
                expect(res.body.errors).to.have.lengthOf(2);
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    describe('Test get portolio data', function() {
        it('Should received status of 200 and all portoflio data', function(done) {
            chai.request(app).get('/portofolio')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('OK');
                expect(res.body.data).to.be.an('array');
                done();
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
})