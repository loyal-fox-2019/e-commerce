const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
const chaiHttap = require('chai-http')
const app = require('../app')
const { createProduct, deleteProduct, createUser, deleteUser } = require('./testHelper')
const { genToken } = require('../helpers/jwt')

chai.use(chaiHttap)
// const chai.request(app) = chai.request(app)
describe('Products test => /products', async function () {
    let id_item;
    after(async function () {
        // console.log('delete');
        id_item = null
        await deleteUser()
        await deleteProduct()
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
    let token, user;
    before(async function () {
        user = await createUser(fake)
        console.log({ id: user._id });
        token = genToken({ id: user._id })
    })

    describe('POST /products', function () {

        it('should create new product', function (done) {
            chai.request(app).post('/products')
                .send(dataProduct)
                .set('token', token)
                .end(function (err, res) {
                    id_item = res.body._id
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('name')
                        .and.to.be.a('string')
                        .and.to.be.equal('Batu')
                    expect(res.body).to.have.property('image')
                        .and.to.be.a('string')
                        .and.to.be.equal('gambar')
                    expect(res.body).to.have.property('price')
                        .and.to.be.a('number')
                        .and.to.be.equal(12000)
                    expect(res.body).to.have.property('description')
                        .and.to.be.a('string')
                        .and.to.be.equal('Mencoba coba')
                    expect(res.body).to.have.property('stock')
                        .and.to.be.a('number')
                        .and.to.be.equal(3)
                    expect(res.body).to.have.property('weight')
                        .and.to.be.a('number')
                        .and.to.be.equal(1)
                    done()
                })
        })

        it('expect true to be true', function (done) {
            chai.request(app).post('/products')
                .send(dataProduct)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(true).to.be.equal(true)
                    expect(false).to.be.equal(false)
                    expect(1).to.be.equal(1)
                    expect('ayam').to.be.equal('ayam')
                    expect('carl').to.be.equal('carl')
                    expect('patra').to.be.equal('patra')
                    done()
                })
        })

        it('should return validation error', function (done) {
            chai.request(app).post('/products')
                .send({})
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                        .and.to.be.a('array')
                    done()
                })
        })

        it('should return validation error for name', function (done) {
            let dataku = dataProduct
            delete dataku.name
            chai.request(app).post('/products')
                .send(dataku)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                        .and.to.be.a('array')
                        .and.to.be.include('Name is required')
                    done()
                })
        })
    })

    describe('GET /products', function () {

        it('/ => should return array of products', function (done) {
            chai.request(app).get('/products')
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })

        it('/mine => should return array of products of auth users', function (done) {
            chai.request(app).get('/products/mine')
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })

        it('/:id => should return single product as object', function (done) {
            chai.request(app).get('/products/' + id_item)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                        .and.to.be.a('string')
                        .and.to.be.equal('Batu')
                    expect(res.body).to.have.property('image')
                        .and.to.be.a('string')
                        .and.to.be.equal('gambar')
                    expect(res.body).to.have.property('price')
                        .and.to.be.a('number')
                        .and.to.be.equal(12000)
                    expect(res.body).to.have.property('description')
                        .and.to.be.a('string')
                        .and.to.be.equal('Mencoba coba')
                    expect(res.body).to.have.property('stock')
                        .and.to.be.a('number')
                        .and.to.be.equal(3)
                    expect(res.body).to.have.property('weight')
                        .and.to.be.a('number')
                        .and.to.be.equal(1)
                    done()
                })
        })
    })

    describe('PUT /products/:id', function () {
        it('should edit the product data', function (done) {
            let dataEditor = {
                name: 'Batu Bata',
                image: 'gambar batu',
                price: 10000,
                description: 'Mencoba bisa',
                stock: 2,
                weight: 1.5,
                city: 'Jakarta'
            }

            chai.request(app).put('/products/' + id_item)
                .send(dataEditor)
                .set('token', token)
                .end(function (err, res) {
                    id_item = res.body._id
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('name')
                        .and.to.be.a('string')
                        .and.to.be.equal('Batu Bata')
                    expect(res.body).to.have.property('image')
                        .and.to.be.a('string')
                        .and.to.be.equal('gambar batu')
                    expect(res.body).to.have.property('price')
                        .and.to.be.a('number')
                        .and.to.be.equal(10000)
                    expect(res.body).to.have.property('description')
                        .and.to.be.a('string')
                        .and.to.be.equal('Mencoba bisa')
                    expect(res.body).to.have.property('stock')
                        .and.to.be.a('number')
                        .and.to.be.equal(2)
                    expect(res.body).to.have.property('weight')
                        .and.to.be.a('number')
                        .and.to.be.equal(1.5)
                    done()
                })
        })

        it('should return error when edit cz doesnt have token', function (done) {
            chai.request(app).put('/products/' + id_item)
                .send(dataProduct)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                        .and.to.be.equal('jwt must be provided')
                    done()
                })
        })
    })

    describe('DELETE /products/:id', function () {
        it('should edit the product data', function (done) {
            chai.request(app).put('/products/' + id_item)
                .end(function (err, res) {
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                        .and.to.be.equal('jwt must be provided')
                    done()
                })
        })

        it('should delete the product', function (done) {
            chai.request(app).delete('/products/' + id_item)
                .set('token', token)
                .end(function (err, res) {
                    id_item = res.body._id
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('name')
                        .and.to.be.a('string')
                        .and.to.be.equal('Batu Bata')
                    expect(res.body).to.have.property('image')
                        .and.to.be.a('string')
                        .and.to.be.equal('gambar batu')
                    expect(res.body).to.have.property('price')
                        .and.to.be.a('number')
                        .and.to.be.equal(10000)
                    expect(res.body).to.have.property('description')
                        .and.to.be.a('string')
                        .and.to.be.equal('Mencoba bisa')
                    expect(res.body).to.have.property('stock')
                        .and.to.be.a('number')
                        .and.to.be.equal(2)
                    expect(res.body).to.have.property('weight')
                        .and.to.be.a('number')
                        .and.to.be.equal(1.5)
                    done()
                })
        })
    })

})