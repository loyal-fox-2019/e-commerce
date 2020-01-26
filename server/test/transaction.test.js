const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect,
  app = require("../app"),
  Product = require("../models/product"),
  User = require("../models/user"),
  Transaction = require("../models/transaction");

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

let seller = {
  profile_pic:
    "https://storage.googleapis.com/bucket.amilhasbala.com/1579934408895-user.png",
  username: "John Doe",
  email: "john@mail.com",
  password: "123456"
};

let customer = {
  profile_pic:
    "https://storage.googleapis.com/bucket.amilhasbala.com/1579934408895-user.png",
  username: "Jane Doe",
  email: "jane@mail.com",
  password: "123456"
};

let createdProduct = {};
let createdTransaction = {};

let tokenSeller = "";
let tokenCustomer = "";

after(function(done) {
  Product.deleteMany({})
    .then(function() {
      console.log("Product collection cleared!");
      return User.deleteMany({});
    })
    .then(function() {
      console.log("User collection cleared!");
      return Transaction.deleteMany({});
    })
    .then(function() {
      console.log("Transaction collection cleared!");
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
    .send(seller)
    .then(function(res) {
      tokenSeller = res.body.token;
      return chai
        .request(app)
        .post("/register")
        .send(customer);
    })
    .then(function(res) {
      tokenCustomer = res.body.token;
      return chai
        .request(app)
        .post("/products")
        .send(product)
        .set("token", tokenSeller);
    })
    .then(function(res) {
      createdProduct = res.body;
      done();
    })
    .catch(function(err) {
      console.log(err);
    });
});

describe("Transaction CRUD", function() {
  describe("GET /transactions", function() {
    it("should send an array of transaction with status code 200", function(done) {
      // Request
      chai
        .request(app)
        .get("/transactions")
        .set("token", tokenSeller)
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
  describe("POST /transactions", function() {
    it("should send a newly created transaction with status code 201", function(done) {
      // Request
      chai
        .request(app)
        .post("/transactions")
        .send({
          product: createdProduct._id,
          quantity: 1
        })
        .set("token", tokenCustomer)
        .then(function(res) {
          createdTransaction = res.body;
          // Assert
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("Object");
          expect(res.body).to.have.all.keys(
            "_id",
            "product",
            "user",
            "seller",
            "createdAt",
            "updatedAt",
            "status",
            "quantity",
            "__v"
          );
          expect(res.body.product).to.be.a("String");
          expect(res.body.user).to.be.a("String");
          expect(res.body.seller).to.be.a("String");
          expect(res.body.quantity).to.be.a("Number");
          expect(res.body.status).to.be.a("String");
          expect(res.body.status).to.be.equal("pending");
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    describe(`error or failed response`, () => {
      it("failed to create transaction : authentication failed", done => {
        let newProduct = { ...product };
        chai
          .request(app)
          .post("/transactions")
          .send({
            product: createdProduct._id,
            quantity: 1
          })
          .set("token", "")
          .end(function(err, res) {
            expect(err).to.be.null;
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

  describe("PATCH /transactions/:id/quantity", () => {
    describe(`success response updated transaction`, () => {
      it("supposed return updated response with status 200 ", done => {
        let quantityUpdate = { quantity: 14 };
        chai
          .request(app)
          .patch(`/transactions/${createdTransaction._id}/quantity`)
          .set("token", tokenCustomer)
          .send(quantityUpdate)
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

    describe(`error response update transaction`, () => {
      it("failed update product : authentication error", done => {
        let quantityUpdate = { quantity: 14 };
        chai
          .request(app)
          .patch(`/transactions/${createdTransaction._id}/quantity`)
          .set("token", "")
          .send(quantityUpdate)
          .end(function(err, res) {
            expect(err).to.be.null;
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

  describe("DELETE /transactions/:id", () => {
    describe(`success response delete transaction`, () => {
      it("supposed to delete a transaction", done => {
        chai
          .request(app)
          .delete(`/transactions/${createdTransaction._id}`)
          .set("token", tokenCustomer)
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

    describe(`error response delete a transaction`, () => {
      it("failed delete transaction : transaction not found", done => {
        chai
          .request(app)
          .delete(`/transactions/${createdTransaction._id}`)
          .set("token", tokenCustomer)
          .end((err, res) => {
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
