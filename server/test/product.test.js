const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

let tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2NWQ2MDY3NDYwNDVlNDFjMTEwODgiLCJuYW1lIjoidGVzIiwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1Nzk1NzI1NzZ9.mnTje25BFzz_xjNcfqOOAL6MzAGXygPW-3Te41jozMA'
let tokenCustomer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2Nzc5MjVkYTZlZDYzNjI3ZjQwOGMiLCJuYW1lIjoiY3VzdG9tIiwiZW1haWwiOiJjdXN0b21AbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1Nzk1NzkyODJ9.0jibdgW9iOd1aEHuxaKJ7KC9WwJyLO5RTSrgMJCEdC8'

const expect = chai.expect

describe('Product CRUD', function(){
    describe('POST /products', function(){
        it('should return Product object with status code 201', function(done){
            chai.request(app)
            .post('/products')
            .set('token', tokenAdmin)
            .send({
                name: "Mizuno",
                description: "glove",
                price: 300000,
                picture: "mizuno.jpg",
                stock: 200
            })
            .then(function(res){

                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('picture')
                expect(res.body).to.have.property('created_at')
                expect(res.body).to.have.property('stock')
                expect(res.body.name).to.equal('Mizuno')
                expect(res.body.description).to.equal('glove')
                expect(res.body.price).to.equal(300000)
                expect(res.body.picture).to.equal('mizuno.jpg')
                expect(res.body.stock).to.equal(200)

                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        it('should return ERROR with status code 400', function(done){
            chai.request(app)
            .post('/products')
            .send({
                name: "",
                description: "",
                price: null,
                picture: ""
            })
            .then(function(res){

                expect(res).to.have.status(400)

                done()

            })
            .catch(function(err){
                console.log(err);
            })
        })
    })

    describe('GET /products', function(){
        it.only('should return Array of Product object with status code 200', function(done){
            chai.request(app)
            .get('/products')
            .then(function(res){

                console.log(res.body);
                

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')

                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })

    describe('GET /products/:productId', function(){
        it('should return Product object with requested Product _id and status code 200', function(done){
            chai.request(app)
            .get('/products/5e2551d2a96ada44b40fe30b')
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal('Zett')
                expect(res.body.description).to.equal('glove')
                expect(res.body.price).to.equal(500000)
                expect(res.body.picture).to.equal('zett.jpg')
                expect(res.body.stock).to.equal(200)

                done()

            })
            .catch(err=>{
                console.log(err)
            })
        })
    })

    describe('PATCH /products/:productId', function(){
        it('should return selected Product object with requested Product _id and status code 200', function(done){
            chai.request(app)
            .patch('/products/5e2551d2a96ada44b40fe30b')
            .set('token', tokenAdmin)
            .send({
                name: "Mizuno",
                price: 300000,
                picture: "mizuno.jpg"
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('created_at')
                expect(res.body).to.have.property('stock')
                expect(res.body.name).to.equal('Zett')
                expect(res.body.price).to.equal(500000)
                expect(res.body.picture).to.equal('zett.jpg')

                done()

            })
            .catch(err=>{
                console.log(err);
            })
        })
    })

    describe('DELETE /products/:productId', function(){
        it('should return deleted status with status code 200', function(done){
            chai.request(app)
            .delete('/products/5e265db710a9815ea897f656')
            .set('token', tokenAdmin)
            .then(function(res){
                
                expect(res).to.have.status(200)

                done()

            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
})