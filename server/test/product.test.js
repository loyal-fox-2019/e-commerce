const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTJkNWViNzVkNzIyYjFjMGM5OWQyMzEiLCJuYW1lIjoidGVzIiwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE1ODAwMzE5NTd9.d6Ry9EJCgynNq3n1HHXOZFjkfynkriuAVVm2aMk9VE8'
let userId = '5e2d5eb75d722b1c0c99d231'

const expect = chai.expect

describe('Product CRUD', function(){
    describe('POST /products', function(){
        it('should return Product object with status code 201', function(done){
            chai.request(app)
            .post('/products')
            .set('token', token)
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
                expect(res.body).to.have.property('updatedAt')
                expect(res.body).to.have.property('stock')
                expect(res.body).to.have.property('userOwner')
                expect(res.body.name).to.equal('Mizuno')
                expect(res.body.description).to.equal('glove')
                expect(res.body.price).to.equal(300000)
                expect(res.body.picture).to.equal('mizuno.jpg')
                expect(res.body.stock).to.equal(200)
                expect(res.body.userOwner).to.equal('5e2d5eb75d722b1c0c99d231')

                done()
            })
            .catch(function(err){
                console.log(err);
            })
        })
        it('should return ERROR with status code 401', function(done){
            chai.request(app)
            .post('/products')
            .set('token', 'faketoken')
            .send({
                name: "",
                description: "",
                price: null,
                picture: ""
            })
            .then(function(res){

                expect(res).to.have.status(401)
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Authentication fail')

                done()

            })
            .catch(function(err){
                console.log(err);
            })
        })
    })

    describe('GET /products', function(){
        it('should return Array of Product object with status code 200', function(done){
            chai.request(app)
            .get('/products')
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body[0]).to.be.an('object')
                expect(res.body[0]).to.have.property('_id')
                expect(res.body[0]).to.have.property('name')
                expect(res.body[0]).to.have.property('description')
                expect(res.body[0]).to.have.property('price')
                expect(res.body[0]).to.have.property('picture')
                expect(res.body[0]).to.have.property('stock')
                expect(res.body[0]).to.have.property('userOwner')
                expect(res.body[0]).to.have.property('created_at')
                expect(res.body[0]).to.have.property('updatedAt')
                expect(res.body[0].userOwner).to.be.an('object')

                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })

    describe('GET /products/myProducts', function(){
        it('should return logged in user products as array and status code 200', function(done){
            chai.request(app)
            .get('/products/myProducts')
            .set('token', token)
            .then(function(res){
                
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body[0]).to.be.an('object')
                expect(res.body[0]).to.have.property('_id')
                expect(res.body[0]).to.have.property('name')
                expect(res.body[0]).to.have.property('description')
                expect(res.body[0]).to.have.property('price')
                expect(res.body[0]).to.have.property('picture')
                expect(res.body[0]).to.have.property('stock')
                expect(res.body[0]).to.have.property('userOwner')
                expect(res.body[0]).to.have.property('created_at')
                expect(res.body[0]).to.have.property('updatedAt')
                expect(res.body[0].userOwner).to.be.an('object')
                expect(res.body[0].userOwner._id).to.equal(userId)

                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })

    describe('PATCH /products/:productId', function(){
        it('should return selected Product object with requested Product _id and status code 200', function(done){
            chai.request(app)
            .patch('/products/5e2d61d7c9e0f91dca7f9f53')
            .set('token', token)
            .send({
                name: "Zett",
                price: 500000,
                picture: "zett.jpg"
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('picture')
                expect(res.body).to.have.property('created_at')
                expect(res.body).to.have.property('updatedAt')
                expect(res.body).to.have.property('stock')
                expect(res.body).to.have.property('userOwner')

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
            .delete('/products/5e2d67b009995621367daf4a')
            .set('token', token)
            .then(function(res){
     
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('picture')
                expect(res.body).to.have.property('stock')
                expect(res.body).to.have.property('userOwner')

                done()

            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
})