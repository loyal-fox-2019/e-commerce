const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Model = require('../models/products')
chai.use(chaiHttp)

let idProduct = ''

const expect = chai.expect
describe('Product CRUD', function () {
    after(function () {
        Model.deleteMany({})
            .then(success => {
                console.log('Delete Success')
            })
            .catch(err => {
                console.log(err)
            })
    })
    describe('POST /products', function () {
        it('should return status 201 and return an Object of Product', function (done) {
            chai.request(app)
                .post('/products')
                .send({
                    productName: 'Macbook Pro 19" Retina Display',
                    description: 'This is Macbook Pro 19 inch from apple. Buy new in the box',
                    price: 19000000000,
                    category: 'Laptop',
                    stock: 12,
                    image_url: 'https://storage.googleapis.com/miniwp-upload/1579433235144-photo-1576562492346-af59df6a1504.jpeg'
                })
                .then(res => {
                    idProduct = res.body._id
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('productName')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('category')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('image_url')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe('GET /products', function () {
        it('should return status code 200 and return an array of product', function (done) {
            chai.request(app)
                .get(`/products`)
                .then(res => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe('PATCH /products/:id/stock', function () {
        it('should return status code 200 and return an object that have success update message', function (done) {
            chai.request(app)
                .patch(`/products/${idProduct}/stock`)
                .send({ stock: 12 })
                .then(res => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.equal('Stock Porduct Udated')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe('PATCH /products/:id/stock with WRONG ID', function () {
        it('should return status code 404 and return an object that have not found message', function (done) {
            chai.request(app)
                .patch('/products/5e269818cd986f230185ac0c/stock')
                .send({ stock: 12 })
                .then(res => {
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.equal('Cannot Find Product')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
})