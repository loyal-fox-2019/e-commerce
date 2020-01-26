const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Model = require("../models/cart");
chai.use(chaiHttp);

const expect = chai.expect;
describe("Cart CRUD TDD", function() {
  after(function() {
    Model.deleteMany({})
      .then(success => {
        console.log("Delete Success");
      })
      .catch(err => {
        console.log(err);
      });
  });
  describe("Access Cart without token in headers", function() {
    it("should return status 401 and return and object with Authentication Required Message", function(done) {
      chai
        .request(app)
        .get("/cart")
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Authentication Required");
          done();
        });
    });
  });
  describe("Access Cart with invalid token in headers", function() {
    it("should return status 400 and return and object with Invalid Token Message", function(done) {
      chai
        .request(app)
        .get("/cart")
        .set(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQ2NGExYzQ0YzEyMzI0NDBhMTRhZiIsIm5hbWUiOiJKb2hhbiBGYWhyaSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTU4MDAzNDMzMH0.JkxM9AaZGz5Pl1yAS6C3MIHKQkC5R1X90geQYtY"
        )
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Invalid Token");
          done();
        });
    });
  });
  describe("Add item to Cart", function() {
    it("should return status 201 and return object with updated message", function(done) {
      chai
        .request(app)
        .post("/cart/")
        .set(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQ2NGExYzQ0YzEyMzI0NDBhMTRhZiIsIm5hbWUiOiJKb2hhbiBGYWhyaSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTU4MDAzNDMzMH0.JkxM9AaZGz5Pl1yAS6C3MIHKQkC5R1X90geYNB6QYtY"
        )
        .send({
          amount: 12,
          ProductId: "5e2c5358e8b36a2854ab18f2"
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("isCheckout");
          expect(res.body).to.have.property("UserId");
          expect(res.body).to.have.property("ProductId");
          expect(res.body).to.have.property("amount");
          done();
        });
    });
  });
  describe("Delete Cart", function() {
    it("should return status 200 and return object with success message", function(done) {
      chai
        .request(app)
        .delete("/cart/")
        .set(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQ2NGExYzQ0YzEyMzI0NDBhMTRhZiIsIm5hbWUiOiJKb2hhbiBGYWhyaSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTU4MDAzNDMzMH0.JkxM9AaZGz5Pl1yAS6C3MIHKQkC5R1X90geYNB6QYtY"
        )
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Deleted All");
          done();
        });
    });
  });
});
