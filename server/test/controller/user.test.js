const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const chai = require('chai');

const Item = require('../../model/item');
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

let ownItemId = "5e279e3ccced0047254c4d5c";
let notOwnItemId = "5e28b238ee06c7718ffcb317";
let tokenOwner = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2NGMwMDZlZmZmNTMwNGU0N2MxOWUiLCJpYXQiOjE1ODAzMDUwNjR9.Vr0OaPKcu0_RcJk7kDYvjWM8sla64YXxB69uQrWYQaw";

// checking item
describe("Users", () => {

    describe("POST /register", () => {
        // Test to create items record
        it("should post new user record", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name: 'tes',
                    email: "tes@gmail.com",
                    password: "Qwertyuiop1!",
                    cart: []
                })
                .end((err, res) => {
                    if (res.body.code === 400) {
                        res.should.have.status(400);
                    } else {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('token');
                        res.body.message.should.includes('User successfully registered');
                    }
                    done();
                });
        });
    });

    describe("POST /register", () => {
        // Test to create items record
        it("should show error name is required", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    email: "tes@gmail.com",
                    password: "Qwertyuiop1!",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('Name is required, ');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        // Test to create items record
        it("should show error user name min 3 character length", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name:'a',
                    email: "tesx@gmail.com",
                    password: "Qwertyuiop1!",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('user name min 3 character length, ');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        // Test to create items record
        it("should show error user name max 30 character length", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name:'abcde abcde abcde abcde abcde abcde abcde',
                    email: "pesx@gmail.com",
                    password: "Qwertyuiop1!",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('user name max 30 character length, ');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        // Test to create items record
        it("should show error Email is required", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name:'abcde abcde abcde abcde abcde abcde abcde',
                    password: "Qwertyuiop1!",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('Email is required, ');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        it("should show error Email has been registered", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name: 'Michael Putong',
                    email: "michael.wenceslaus@gmail.com",
                    password: "password",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('Email has been registered, ');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        it("should show error Email is not valid", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name: 'Michael Putong',
                    email: "michaelwenceslausgmailcom",
                    password: "password",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('Email is not valid, ');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        it("should show error password is required", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name: 'Michael Putong',
                    email: "michaelwenceslausgmailcom",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('Password is required, ');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        it("should show error Password must contain at least 1 number, letters, symbol, Uppercase and lowercase", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name: 'Michael Putong',
                    email: "michaelwenceslausgmailcom",
                    password: "abcdefgh",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('Password must contain at least 1 number, letters, symbol, Uppercase and lowercase, ');
                    done();
                });
        });
    });

    describe("POST /login", () => {
        it("should get user token (login process)", (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: "michael.wenceslaus@gmail.com",
                    password: "password"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('token');
                    res.body.should.have.property('message');
                    res.body.message.should.includes('User successfully login');
                    // console.log(res.body)
                    done();
                });
        });
    });

    describe("GET /verify", () => {
        it("should get user details (verify) got new token", (done) => {
            chai.request(app)
                .get('/api/users/verify')
                .set('token', tokenOwner)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('token');
                    res.body.should.have.property('message');
                    res.body.message.should.includes('User successfully verified');
                    // console.log(res.body)
                    done()
                });
        });
    });

    describe("PATCH /cart", () => {
        it("should succeed to add items to chart", (done) => {
            chai.request(app)
                .patch('/api/users/cart')
                .set('token', tokenOwner)
                .send({
                    cart: {
                        item: notOwnItemId,
                        stock: 1,
                        price: 80000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.includes('item successfully add to cart');
                    // console.log(res.body)
                    done()
                });
        });
    });

    describe("PATCH /cart", () => {
        it("should error not allowed to buy your own item", (done) => {
            chai.request(app)
                .patch('/api/users/cart')
                .set('token', tokenOwner)
                .send({
                    cart: {
                        item: ownItemId,
                        stock: 2,
                        price: 80000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('You are not allowed to buy your own item');
                    // console.log(res.body)
                    done()
                });
        });
    });

    describe("PATCH /cart", () => {
        it("should error data not found", (done) => {
            chai.request(app)
                .patch('/api/users/cart')
                .set('token', tokenOwner)
                .send({
                    cart: {
                        item: "foobar",
                        stock: 2,
                        price: 80000
                    }
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('data not found');
                    // console.log(res.body);
                    done()
                });
        });
    });

    describe("DELETE /cart/:id", () => {
        it("should item successfully remove from cart", (done) => {
            chai.request(app)
                .delete('/api/users/cart/' + notOwnItemId)
                .set('token', tokenOwner)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.includes('item successfully remove from cart');
                    // console.log(res.body);
                    done()
                });
        });
    });

    describe("DELETE /cart/:id", () => {
        it("should item error remove from cart", (done) => {
            chai.request(app)
                .delete('/api/users/cart/foobar')
                .set('token', tokenOwner)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    res.body.errMsg.should.includes('data not found');
                    // console.log(res.body);
                    done()
                });
        });
    });

});