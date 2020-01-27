'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
let ProductId = ''
let token = ''
let unauthorizedToken = ''

const User = require('../models/user')
const Product = require('../models/product')

const { sign } = require('../helpers/jwt')

chai.use(chaiHttp)

before(function (done) {
    User
        .create({
            first_name: 'admin',
            last_name: 'web',
            email: 'admin@mail.com',
            password: 'admin123',
            role: 'admin'
        })
        .then((newUser) => {
            let { _id, first_name, last_name, email, role } = newUser
            let payload = { id: _id, first_name, last_name, email, role }
            token = sign(payload)
        })
        .catch(err => {
            console.log(err)
            done()
        })

    User
        .create({
            first_name: 'Uchiha',
            last_name: 'Sasuke',
            email: 'sasuke@mail.com',
            password: 'sasuke123',
            role: 'customer'
        })
        .then((newUser) => {
            let { _id, first_name, last_name, email, role } = newUser
            let payload = { id: _id, first_name, last_name, email, role }
            unauthorizedToken = sign(payload)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })

})

after(function (done) {
    User
        .deleteMany({})
        .then(() => { })
        .catch((err) => {
            done()
            console.log(err)
        })

    Product
        .deleteMany({})
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
})

describe('Product tests', function () {
    describe('POST /products', function () {
        describe('Success Parameter Value', function () {
            let newProduct = {
                name: 'Yezzy Nike',
                description: 'My Best Design Ever',
                price: 1000,
                stock: 12,
                image: 'http://image',
                designer: 'kanye west'
            }

            it('should send an object with status code 201', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send(newProduct)
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(newProduct).to.have.property('name')
                        expect(newProduct).to.have.property('description')
                        expect(newProduct).to.have.property('price')
                        expect(newProduct).to.have.property('stock')
                        expect(newProduct).to.have.property('image')
                        expect(newProduct).to.have.property('designer')
                        ProductId = res.body.createdProduct._id
                        done()
                    })
            })

            it('should send an object with status code 201', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        name: 'Adidas Ultra Boost',
                        description: '',
                        price: 1000,
                        stock: 24,
                        image: 'http://image',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(newProduct).to.have.property('name')
                        expect(newProduct).to.have.property('price')
                        expect(newProduct).to.have.property('stock')
                        expect(newProduct).to.have.property('image')
                        expect(newProduct).to.have.property('designer')
                        ProductId = res.body.createdProduct._id
                        done()
                    })
            })
        })

        describe('error parameter value', function () {
            it('should return status code 401 with object (ERROR: You do not have access!) ', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        name: 'Adidas Ultra Boost',
                        description: 'Adidas Shoes',
                        price: 1000,
                        stock: 24,
                        image: 'http://image',
                        designer: 'kanye west'
                    })
                    .end(function (err, res) {
                        let { message } = res.body
                        expect(message).equal('Please provide a valid accessToken')
                        done()
                    })
            })

            it('should return status code 500 with object (ERROR: The Field is required) for product name', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        name: '',
                        description: 'Best Style Shoes',
                        price: 1000,
                        stock: 24,
                        image: 'http://image',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        const { message } = res.body
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('the field is required')
                        done()
                    })
            })

            it('should return status code 500 with object (ERROR: Price is less than minimum allowed value )', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        name: 'Adidas Ultra Boost',
                        description: 'Best Style Shoes',
                        price: 0,
                        stock: 24,
                        image: 'http://image',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        const { message } = res.body
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('`price` (0) is less than minimum allowed value (1).')
                        done()
                    })
            })

            it('should return status code 500 with object (ERROR: Stock is less than minimum allowed value )', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        name: 'Adidas Ultra Boost',
                        description: 'Best Style Shoes',
                        price: 100,
                        stock: 0,
                        image: 'http://image',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        const { message } = res.body
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('`stock` (0) is less than minimum allowed value (1).')
                        done()
                    })
            })

            it('should return status code 500 with object (ERROR: Stock is required )', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        name: 'Adidas Ultra Boost',
                        description: 'Best Style Shoes',
                        price: 0,
                        stock: '',
                        image: 'http://image',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        const { message } = res.body
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('the field is required')
                        done()
                    })
            })

            it('should return status code 500 with object (ERROR: Price is required)', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({
                        name: 'Adidas Ultra Boost',
                        description: 'Best Style Shoes',
                        price: '',
                        stock: 24,
                        image: 'http://image',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        const { message } = res.body
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('object')
                        expect(message).to.include('the field is required')
                        done()
                    })
            })
        })
    })

    describe('GET Products', function () {
        describe('sucess paramater value', function () {
            it('should return status code 200 with array of object products', function (done) {
                chai
                    .request(app)
                    .get('/products')
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        expect(err).to.be.null
                        done()
                    })
            })

            it('should return status code 200 object product', function (done) {
                chai
                    .request(app)
                    .get(`/products/${ProductId}`)
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(err).to.be.null
                        done()
                    })
            })
        })

        describe('error parameter value', function () {
            it('should return status 401 (ERROR : You do not have access! )', function (done) {
                chai
                    .request(app)
                    .get('/products')
                    .end(function (err, res) {
                        let { message } = res.body
                        expect(res).to.have.status(401)
                        expect(message).equal('Please provide a valid accessToken')
                        done()
                    })
            })
        })
    })

    describe('update /products', function () {
        describe('success parameter value', function () {

            it('should return 200 with an object of updated data and message Successfully update data', function (done) {
                chai
                    .request(app)
                    .put(`/products/${ProductId}`)
                    .send({
                        name: 'Yezzy Nike',
                        description: 'My Best Design Ever',
                        price: 1000,
                        stock: 12,
                        image: 'image123.jpg',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res).is.an('object')
                        expect(res.body).is.an('object')
                        expect(res.body.updatedProduct._id).equal(ProductId)
                        expect(res.body.message).to.include('Updated product!')
                        done()
                    })
            })

            it('should return 200 with an object of updated data and message Successfully update data one value', function (done) {
                chai
                    .request(app)
                    .put(`/products/${ProductId}`)
                    .send({
                        name: 'Yezzy Nike',
                        description: 'My Friend Best Design Ever',
                        price: 1000,
                        stock: 12,
                        image: 'image123.jpg',
                        designer: 'kanye west'
                    })
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res).is.an('object')
                        expect(res.body).is.an('object')
                        expect(res.body.updatedProduct._id).equal(ProductId)
                        expect(res.body.message).to.include('Updated product!')
                        done()
                    })
            })
        })

        describe('error paramater value', function () {

            it('should return status 401 NOT AUTHENCTICATED with message You do not have access!', function (done) {
                chai
                    .request(app)
                    .patch(`/products/${ProductId}`)
                    .send({
                        name: 'Yezzy Nike',
                        description: 'My Best Design Ever',
                        price: 1000,
                        stock: 12,
                        image: 'image123.jpg',
                        designer: 'kanye west'
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(401)
                        expect(res.body.message).equal('Please provide a valid accessToken')
                        done()
                    })
            })

            it('should return status 401 UNAUTHORIZED with message You do not have access!', function (done) {
                chai
                    .request(app)
                    .put(`/products/${ProductId}`)
                    .send({
                        name: 'Yezzy Nike',
                        description: 'My Best Design Ever',
                        price: 1000,
                        stock: 12,
                        image: 'image123.jpg',
                        designer: 'kanye west'
                    })
                    .set('access-token', unauthorizedToken)
                    .end(function (err, res) {
                        expect(res).to.have.status(401)
                        expect(res).is.an('object')
                        expect(res.body).is.an('object')
                        expect(res.body.type).equal('AUTHORIZATION ERROR')
                        expect(res.body.message).equal('You do not have access!')
                        done()
                    })
            })
        })
    })

    describe('DELETE /products', function () {
        describe('sucess parameter value', function () {
            it('should return 200 with an object of deleted data and Successfully delete product message', function (done) {
                chai
                    .request(app)
                    .delete(`/products/${ProductId}`)
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body.deletedProduct._id).equal(ProductId)
                        expect(err).to.be.null
                        expect(res.body.message).equal('Deleted product!')
                        done()
                    })
            })
        })

        describe('error parameter value', function () {
            it('should return 401 (ERROR : You do not have access! NOT AUTHORIZED)', function (done) {
                chai
                    .request(app)
                    .delete(`/products/${ProductId}`)
                    .end(function (err, res) {
                        let { message } = res.body
                        expect(res).to.have.status(401)
                        expect(message).equal('Please provide a valid accessToken')
                        done()
                    })
            })

            it('should return 401 (ERROR : You are not authorized! )', function (done) {
                chai
                    .request(app)
                    .delete(`/products/${ProductId}`)
                    .set('access-token', unauthorizedToken)
                    .end(function (err, res) {
                        expect(res).to.have.status(401)
                        expect(res).is.an('object')
                        expect(res.body).is.an('object')
                        expect(res.body.type).equal('AUTHORIZATION ERROR')
                        expect(res.body.message).equal('You do not have access!')
                        done()
                    })
            })

            it('should return 404 (ERROR : not found )', function (done) {
                chai
                    .request(app)
                    .delete(`/products/8973bcc73cfb3da498b86843`)
                    .set('access-token', token)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body.message).equal('not found')
                        done()
                    })
            })
        })
    })
})