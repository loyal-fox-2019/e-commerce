'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Portoflio post and get', function() {
    describe('Testing create new portolio', function() {
        it('Should received status of 201 and new portofolio data', function(done) {
            chai.request(app).post('/portofolio').send({image: 'image', description: 'Bmw with fucking wheels'})
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