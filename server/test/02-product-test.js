// 'use strict'

// const chai = require('chai')
// const chaiHttp = require('chai-http')

// const app = require('../app')
// const expect = chai.expect

// chai.use(chaiHttp)

// describe('Products CRUD Test', function () {
//     describe('POST /products || Create A New Product (admin only)', function () {
//         it('create a new product with correct product data using valid access_token level admin, should send an object with 201 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "url-image",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(201)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')
//                         .and.to.have.property('product')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('insert new product success!')

//                     expect(res.body.product).to.be.an('object')
//                         .and.to.have.property('name')
//                         .and.to.have.property('description')
//                         .and.to.have.property('image')
//                         .and.to.have.property('weight')
//                         .and.to.have.property('price')
//                         .and.to.have.property('stock')
//                         .and.to.have.property('display')

//                     expect(res.body.product.name).to.be.an('string')
//                         .and.to.be.equal('product name')

//                     expect(res.body.product.description).to.be.an('string')
//                         .and.to.be.equal('product description')

//                     expect(res.body.product.image).to.be.an('string')
//                         .and.to.be.equal('url-image')

//                     expect(res.body.product.weight).to.be.an('number')
//                         .and.to.be.equal(1)

//                     expect(res.body.product.price).to.be.an('number')
//                         .and.to.be.equal(100000)

//                     expect(res.body.product.stock).to.be.an('number')
//                         .and.to.be.equal(50)

//                     expect(res.body.product.displayStatus).to.be.true

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with correct product data using valid access_token level user, should send an object with 403 status code', function (done) {
//             const access_token = 'userAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "url-image",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(403)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('forbiden, only admin can create a new product!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with correct product data using invalid access_token, should send an object with 400 status code', function (done) {
//             const access_token = 'invalidAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "url-image",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('invalid access token!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with correct product data using empty access_token, should send an object with 400 status code', function (done) {
//             const access_token = ''
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "url-image",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('access token must be provided!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with empty product name using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'invalidAccessToken'
//             const newProductData = {
//                 name: "",
//                 description: "product description",
//                 image: "url-image",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('product name is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with with empty product description using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "",
//                 image: "url-image",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('description is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with with empty product image using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('image is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with with empty product weight using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "url-image",
//                 weight: '',
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('weight is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with with empty product price using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "url-image",
//                 weight: 1,
//                 price: '',
//                 stock: 50
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('price is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('create a new product with with empty product stock using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const newProductData = {
//                 name: "product name",
//                 description: "product description",
//                 image: "url-image",
//                 weight: 1,
//                 price: 100000,
//                 stock: ''
//             }
//             chai.request(app)
//                 .post('/products')
//                 .set({ access_token: access_token })
//                 .send(newProductData)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('stock is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })
//     })

//     describe('PATCH /products/:productID || Edit Product Data (admin only)', function () {
//         it('edit product data with correct new product data using valid access_token level admin, should send an object with 200 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(200)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')
//                         .and.to.have.property('product')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('edit product with ID ' + productID + ' success!')

//                     expect(res.body.product).to.be.an('object')
//                         .and.to.have.property('name')
//                         .and.to.have.property('description')
//                         .and.to.have.property('image')
//                         .and.to.have.property('weight')
//                         .and.to.have.property('price')
//                         .and.to.have.property('stock')
//                         .and.to.have.property('display')

//                     expect(res.body.product.name).to.be.an('string')
//                         .and.to.be.equal('product name')

//                     expect(res.body.product.description).to.be.an('string')
//                         .and.to.be.equal('product description')

//                     expect(res.body.product.image).to.be.an('string')
//                         .and.to.be.equal('url-image')

//                     expect(res.body.product.weight).to.be.an('number')
//                         .and.to.be.equal(1)

//                     expect(res.body.product.price).to.be.an('number')
//                         .and.to.be.equal(100000)

//                     expect(res.body.product.stock).to.be.an('number')
//                         .and.to.be.equal(50)

//                     expect(res.body.product.displayStatus).to.be.true

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with correct product data using valid access_token level user, should send an object with 403 status code', function (done) {
//             const access_token = 'userAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(403)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('forbiden, only admin can edit product data!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with correct product data using invalid access_token, should send an object with 400 status code', function (done) {
//             const access_token = 'invalidAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('invalid access token!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with correct product data using empty access_token, should send an object with 400 status code', function (done) {
//             const access_token = ''
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('access token must be provided!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with empty product name using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('product name is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with with empty product description using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('description is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with with empty product image using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('image is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with with empty product weight using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: '',
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('weight is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with with empty product price using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('price is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })

//         it('edit product data with with empty product stock using valid access_token level admin, should send an object with 400 status code', function (done) {
//             const access_token = 'adminAccessToken'
//             const productID = 'productID'
//             const productDataEdit = {
//                 name: "product name edit",
//                 description: "product description edit",
//                 image: "url-image-edit",
//                 weight: 1,
//                 price: 100000,
//                 stock: 50
//             }
//             chai.request(app)
//                 .patch('/products/' + productID)
//                 .set({ access_token: access_token })
//                 .send(productDataEdit)
//                 .then(function (res) {
//                     expect(res).to.have.status(400)

//                     expect(res.body).to.be.an('object')
//                         .and.to.have.property('message')

//                     expect(res.body.message).to.be.an('string')
//                         .and.to.be.equal('stock is required!')

//                     done()
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                 })
//         })
//     })
// })