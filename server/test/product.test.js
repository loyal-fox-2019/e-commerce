const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect,
  app = require("../app"),
  Product = require("../models/product"),
  User = require("../models/user");

chai.use(chaiHttp);

let product = {
  name: "Sayur Asem Betawi",
  price: 2000,
  description: "Sayur asem enak, yang bikin orang betawi",
  stock: 100,
  category: "sayur",
  image:
    "https://sifu.unileversolutions.com/image/id-ID/recipe-topvisual/2/1260-709/sayur-asem-50447740.jpg"
};

let user = {
  profile_pic:
    "https://storage.googleapis.com/bucket.amilhasbala.com/1579934408895-user.png",
  username: "John Doe Product Test",
  email: "johndoeproducttest@mail.com",
  password: "123456"
};

let createdProduct = {};

let token = "";

after(function(done) {
  Product.deleteMany({})
    .then(function() {
      console.log("Product collection cleared!");
      return User.deleteMany({});
    })
    .then(function() {
      console.log("User collection cleared!");
      done();
    })
    .catch(function(err) {
      console.log(err);
    });
});

before(function(done) {
  chai
    .request(app)
    .post("/register")
    .send(user)
    .then(function(res) {
      token = res.body.token;
      done();
    })
    .catch(function(err) {
      console.log(err);
    });
});

describe("Product CRUD", function() {
  describe("GET /products", function() {
    it("should send an array of products with status code 200", function(done) {
      // Request
      chai
        .request(app)
        .get("/products")
        .then(function(res) {
          // Assert
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  });
  describe("POST /products", function() {
    it("should send a newly created product with status code 201", function(done) {
      // Request
      chai
        .request(app)
        .post("/products")
        .set("token", token)
        .send(product)
        .then(function(res) {
          createdProduct = res.body;
          // Assert
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("Object");
          expect(res.body.name).to.be.a("String");
          expect(res.body.description).to.be.a("String");
          expect(res.body.image).to.be.a("String");
          expect(res.body.category).to.be.a("String");
          expect(res.body.stock).to.be.a("Number");
          expect(res.body.price).to.be.a("Number");
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    describe(`error or failed response`, () => {
      it("failed add product : empty product keys required", done => {
        let failedProduct = { ...product };
        delete failedProduct.name;
        delete failedProduct.price;
        chai
          .request(app)
          .post("/products")
          .set("token", token)
          .send(failedProduct)
          .end(function(err, res) {
            let error = res.body.message;
            expect(error).to.be.an("Array");
            expect(error).that.includes(`Silahkan masukkan nama produk`);
            expect(error).that.includes(`Silahkan masukkan harga produk`);
            done();
          });
      });

      it("failed add product : authentication failed", done => {
        let newProduct = { ...product };
        chai
          .request(app)
          .post("/products")
          .set("token", "")
          .send(newProduct)
          .end(function(err, res) {
            // console.log(err);
            expect(res).to.have.status(400);
            expect(res.body)
              .to.be.an("Object")
              .to.have.any.keys("message");
            expect(res.body.message[0]).to.equal("you have to login first");
            done();
          });
      });
    });
  });
  describe("PATCH /products/:id/stock", () => {
    describe(`success response updated product`, () => {
      it("supposed return updated product with state 200 ", done => {
        let productToUpdate = { stock: 14 };
        chai
          .request(app)
          .patch(`/products/${createdProduct._id}/stock`)
          .set("token", token)
          .send(productToUpdate)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("Object")
              .to.have.all.keys("n", "nModified", "ok");
            expect(res.body.nModified).to.equal(1);
            done();
          });
      });
    });

    describe(`error response update product`, () => {
      it("failed update product : product not found", done => {
        let productToUpdate = { stock: 102 };
        chai
          .request(app)
          .patch(`/products/5e2d271d5a69674a4b5bd275/stock`)
          .set("token", token)
          .send(productToUpdate)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body)
              .to.be.an("Object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal(`id not found`);
            done();
          });
      });
    });
  });

  describe("DELETE /products/:id", () => {
    describe(`success response delete product`, () => {
      it("supposed to delete a product", done => {
        chai
          .request(app)
          .delete(`/products/${createdProduct._id}`)
          .set("token", token)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("Object")
              .to.have.any.keys("n", "deletedCount", "ok");
            expect(res.body.deletedCount).to.equal(1);
            done();
          });
      });
    });

    describe(`error response delete product`, () => {
      it("failed delete product : product not found", done => {
        // console.log(`${createdProduct._id.slice(createdProduct._id.length - 1)}`);
        chai
          .request(app)
          .delete(
            `/products/${createdProduct._id}`
          )
          .set("token", token)
          .end(function(err, res) {
            expect(res).to.have.status(404);
            expect(res.body)
              .to.be.an("Object")
              .to.have.any.keys("message");
            expect(res.body.message).to.equal(`id not found`);
            done();
          });
      });
    });
  });
});
