const app = require('../app')
const chai = require('chai'),
    chaiHttp = require('chai-http')
var expect = chai.expect
const User = require('../models/user')
chai.use(chaiHttp)

describe('Product CRUD.', function () {
    describe('Create Product.', function () {
        describe('Create Product Success Case.', function () {
            it('should return an object with value name, image, price, stock.', function (done) {
                chai.request(app)
                .post('/product')
                .type('form')
                .send({
                    name:'name',
                    image:'image',
                    price: 'price',
                    stock: 5
                })
                .then( res => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    done()
                })
                .catch(done)
            })
        })

        describe('Create Product Error Case', function () {
            it('should throw an error', function (done) {
                chai
                    .request(app)
                    .post('/product')
                    .type('form')
                    .send({
                        name:'',
                        image:'',
                        price:'',
                        stock:''
                    })
                    .then( res => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        expect(res.body.errors).to.include('Input name')
                        expect(res.body.errors).to.include('Input image')
                        expect(res.body.errors).to.include('Input price')
                        expect(res.body.errors).to.include('Input stock')
                        done()
                    })
                    .catch(done)
            })
        })
    })

    describe('Read products',function () {
        it('should return an array of products.', function (done) {
            chai
                .request(app)
                .get('/product')
                .then( res => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
                .catch( done )
        })
    })

    describe('Delete product', function () {
        describe('Delete product success case.', function () {
            it('should return an object with delete result.', function (done) {
                chai
                    .request(app)
                    .delete(`/product/5e25475032e6816c42284544`)
                    .then( res => {
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('n').equal(1)
                        expect(res.body).to.have.property('ok').equal(1)
                        expect(res.body).to.have.property('deletedCount').equal(1)
                        done()
                    })
                    .catch( done )
            })
        })

        describe('Delete product error case.', function () {
            it('should return an error with messsage "Product not found."', function (done) {
                chai
                    .request(app)
                    .delete(`/product/s`)
                    .then( res => {
                        expect(res).to.have.status(400)
                        expect(res.body.errors).to.include('Product not found.')
                        done()
                    })
                    .catch( done )
            })
        })
    })

    describe('Update Product', function () {
        describe('Update product success case', function () {
            it('should return an object with update results', function (done) {
                chai
                    .request(app)
                    .put(`/product/5e254776f0ea386d09b0a5fd`)
                    .type('form')
                    .send({
                        name:'new name',
                        price:'new price',
                        image:'new image',
                        stock:10,
                    })
                    .then( res => {
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        done()
                    })
                    .catch( done )
            })
        })

        describe('Update product error case', function () {
            it('should return an error "Product not found."', function (done) {
                chai
                    .request(app)
                    .put(`/product/5`)
                    .type('form')
                    .send({
                        name:'',
                        price:'',
                        image:'',
                        stock:'',
                    })
                    .then( res => {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        expect(res.body.errors).to.include('Product not found.')
                        done()
                    })
                    .catch( done )
            })
        })
    })
})

describe.only('User API', function () {
    describe('User register', function() {
        describe('User register best case', function() {
            before(() => {
                console.log('after')
                User.deleteMany({ })
            })
            it('Should return token', function(done) {
                chai
                    .request(app)
                    .post('/user/register')
                    .send({
                        name:'Richard',
                        email:'Khonan@mail.com',
                        password:'123456'
                    })
                        .then( res => {
                            expect(res).to.have.status(201)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.be.have.property('token')
                            done()
                        })
                        .catch( done )
            })
        })

        describe('User register error case', function() {
            it('Should return errors', function(done) {
                chai
                    .request(app)
                    .post('/user/register')
                    .send({
                        name: '',
                        email: '',
                        password: ''
                    })
                        .then( res => {
                            expect(res).to.have.status(400)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors).to.be.an('array')
                            expect(res.body.errors).to.include('Input name')
                            done()
                        })
                        .catch( done )
            })
        })
    })

    describe('User login', function() {
        describe('User login best case', function() {
            it('Should return token', function(done) {
                chai
                    .request(app)
                    .post('/user/login')
                    .send({
                        email:'Khonan@mail.com',
                        password:'123456'
                    })
                        .then( res => {
                            expect(res).to.have.status(200)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.be.have.property('token')
                            done()
                        })
                        .catch( done )
            })
        })

        describe('User login error case', function() {
            it('Should return errors', function(done) {
                chai
                    .request(app)
                    .post('/user/login')
                    .send({
                        email: '',
                        password: ''
                    })
                        .then( res => {
                            expect(res).to.have.status(404)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors).to.be.an('array')
                            expect(res.body.errors).to.include('User Not Found.')
                            done()
                        })
                        .catch( done )
            })
        })
    })

    describe('Add item to cart', function() {
        describe('Add item success case', function() {
            it('Should return success result', function(done) {
                chai
                    .request(app)
                    .patch(`/user`)
                    .send({
                        productId:'5e254776f0ea386d09b0a5fd',
                        quantity:1
                    })
                    .set({
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmJkNmE4NzlkNzQ2NjU1YjU1YzZhMCIsImlhdCI6MTU3OTkzOTYyMn0.eCtgJQvpzS4mYjFw_I-gvOEbkABSJTCL2PYUaIGohnU'
                    })
                    .then( res => {
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        done()
                    })
                    .catch( done)
            })
        })

        describe('Add item to cart error case', function() {
            it('should return an error', function(done) {
                chai
                    .request(app)
                    .patch(`/user`)
                    .send({
                        productId:'5e254776f0ea386d09b0a5',
                        quantity:10
                    })
                    .set({
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmJkNmE4NzlkNzQ2NjU1YjU1YzZhMCIsImlhdCI6MTU3OTkzOTYyMn0.eCtgJQvpzS4mYjFw_I-gvOEbkABSJTCL2PYUaIGohnU'
                    })
                    .then( res => {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors).to.be.an('array')
                        expect(res.body.errors).to.include('Product not found.')
                        done()
                    })
                    .catch( done )
            })
        })

        describe('Delete item from cart', function() {
            it('should return delete result', function(done) {
                chai
                    .request(app)
                    .delete(`/user/5e254776f0ea386d09b0a5fd`)
                    .set({
                        token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmJkNmE4NzlkNzQ2NjU1YjU1YzZhMCIsImlhdCI6MTU3OTkzOTYyMn0.eCtgJQvpzS4mYjFw_I-gvOEbkABSJTCL2PYUaIGohnU'
                    })
                        .then( res => {
                            expect(res).to.have.status(201)
                            expect(res.body).to.be.an('object')
                            done()
                        })
                        .catch( done )
            })
        })
    })

    describe.only('Checkout cart', function() {
        it('should return success result', function(done) {
            chai
                .request(app)
                .put('/user')
                .set({
                    token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmJkNmE4NzlkNzQ2NjU1YjU1YzZhMCIsImlhdCI6MTU3OTkzOTYyMn0.eCtgJQvpzS4mYjFw_I-gvOEbkABSJTCL2PYUaIGohnU'
                })
                    .then( res => {
                        expect(res).to.have.status(201)
                        done()
                    })
                    .catch( done )
        })
    })
})