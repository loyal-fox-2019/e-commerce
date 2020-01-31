const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp);
const expect = chai.expect


describe('testing signup and signin  on router /cart/', function() {
    describe('testing add cart', function() {
        it('should return status 201 and {user, inventory, amount}', function(done) {
            chai.request(app)
            .post('/carts')
            .send({amount: 1, inventory: '5e292c78d436e14ece5e85d3'})
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
            .then(function(res){
              expect(res).to.have.status(201)
              done()
            })
        });
    })

    describe('testing get cart', function() {
        it('should return status 200 and [object]', function(done) {
            chai.request(app)
            .get('/carts')
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.be.an('object');
                done()
            })
        });
    })

    describe('testing delete cart', function() {
        it('should return status 200 and', function(done) {
            chai.request(app)
            .delete('/carts/5e2d213a982b6c335d9f9454')
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
            .then(function(res){
                expect(res).to.have.status(200);
                done()
            })
        });
    })

    describe('testing checkout cart', function() {
        it('should return status 200 and', function(done) {
            chai.request(app)
            .delete('/carts/5e2d21efb33e59340955052c')
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
            .then(function(res){
                expect(res).to.have.status(200);
                done()
            })
        });
    })

})