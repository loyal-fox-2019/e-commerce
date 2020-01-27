const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
const chaiHttap = require('chai-http')
const Cart = require('../models/cart')
const app = require('../app')
const { createProduct, deleteProduct, createUser, deleteUser } = require('./testHelper')
const { genToken } = require('../helpers/jwt')
chai.use(chaiHttap)

describe('Cart Test => /carts', function () {

    let id_item, id_cart;
    after(async function () {
        // console.log('delete');
        id_item = null
        await deleteUser()
        await deleteProduct()
        await Cart.deleteMany({})

    })

    let dataProduct = {
        name: 'Batu',
        image: 'gambar',
        price: 12000,
        description: 'Mencoba coba',
        stock: 3,
        weight: 1,
        city: 'Jakarta'
    }

    let fake = {
        name: 'puput',
        email: 'puput@mail.com',
        password: 'adaenam',
        phone: '123456789123'
    }
    let token, user, product
    before(async function () {
        user = await createUser(fake)
        dataProduct.seller = user._id
        product = await createProduct(dataProduct)
        token = genToken({ id: user._id })
        // console.log(token);
    })

    describe('POST /carts', function () {

        it('should create a new cart', function (done) {
            chai.request(app).post('/carts')
                .send({
                    product,
                    qty: 1
                })
                .set('token', token)
                .end(function (err, res) {
                    id_cart = res.body._id
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('buyer')
                    expect(res.body).to.have.property('product')
                    expect(res.body).to.have.property('seller')
                    expect(res.body).to.have.property('qty')
                        .and.to.be.a('number')
                        .and.to.be.equal(1)
                    done()
                })
        })

        it('should increase qty on the cart', function (done) {
            chai.request(app).post('/carts')
                .send({
                    product,
                    qty: 1
                })
                .set('token', token)
                .end(function (err, res) {
                    id_cart = res.body._id
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('buyer')
                    expect(res.body).to.have.property('product')
                    expect(res.body).to.have.property('seller')
                    expect(res.body).to.have.property('qty')
                        .and.to.be.a('number')
                        .and.to.be.equal(2)
                    done()
                })
        })
    })

    describe('GET /carts', function () {
        it('GET /all => get all cart', function (done) {
            chai.request(app).get('/carts/all')
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })

        it('GET /pending => get auth user`s pending cart', function (done) {
            chai.request(app).get('/carts/pending').set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })

        it('GET /paid => get auth user`s paid cart', function (done) {
            chai.request(app).get('/carts/paid').set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })

        it('GET /deliver => get auth user`s delivered item', function (done) {
            chai.request(app).get('/carts/deliver').set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('PATCH /carts', function () {
        it('PATCH /carts/pending', function (done) {
            chai.request(app).patch('/carts/pending/' + id_cart)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('PATCH /carts/paid', function (done) {
            chai.request(app).patch('/carts/paid/' + id_cart)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('PATCH /carts/deliver', function (done) {
            chai.request(app).patch('/carts/deliver/' + id_cart)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })

    describe('DELETE /carts', function () {
        it('DELETE /carts/pending', function (done) {
            chai.request(app).delete('/carts/' + id_cart)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })

})