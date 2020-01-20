const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

const expect = chai.expect

describe('product CRUD', function () {
    describe('Post Product', function () {
        it('shoud return an object with status code 201', function (done) {
            chai
                .request(app)
                .post('/product')
                .send({ name: "laptop", price: 20000, description: "mulus", file: "hai.jpg", stock: 1 })
                .then(function (res) {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('file');
                    expect(res.body.name).to.equal("laptop");
                    expect(res.body.price).to.equal(20000);
                    expect(res.body.description).to.equal("mulus");
                    expect(res.body.file).to.equal("hai.jpg");
                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('shoud return with status code 400', function (done) {
            chai
                .request(app)
                .post('/product')
                .send({
                    name: "",
                    price: "",
                    price: null,
                    file: ""
                })
                .then(function (res) {
                    expect(res).to.have.status(400);
                    done()

                })
                .catch(function (err) {
                    console.log(err)
                })

        })
    })

    describe("get products", function () {
        describe("GET Products", function () {
            it("should return array of object with status code 200", function (done) {
                chai
                    .request(app)
                    .get('/product/all')
                    .then(function (res) {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            })

        })
    })

    describe("get product by title for search feature", function () {
        it("should return an array of object with status code 200", function (done) {
            chai
                .request(app)
                .get('/product/laptop')
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('name');
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })

    })

    describe("update Product", function () {
        it("it should return an object with status code 200 when updated", function (done) {
            chai
                .request(app)
                .put('/product/5e25791c97408d33feb9e0d8')
                .send({ name: "laptop", price: 20000, description: "mulus banget", file: "hai.jpg", stock: 2 })
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("object")
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe("delete Product", function () {
        it("should return an object of the product that was deleted with status code 200", function (done) {
            chai
                .request(app)
                .delete('/product/5e25811c91291d660ce47aef')
                .then(function (res) {
                    expect(res).to.have.status(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

})