const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const chai = require('chai');

const Item = require('../../model/item');
const app = require('../../app');

let itemId = "";
let tokenOwner = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2NGMwMDZlZmZmNTMwNGU0N2MxOWUiLCJpYXQiOjE1ODAzMDUwNjR9.Vr0OaPKcu0_RcJk7kDYvjWM8sla64YXxB69uQrWYQaw"
let tokenNotOwner = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2ZGRlYjQ5YzY3YjQ0OWE2YThlOGMiLCJpYXQiOjE1ODAzMDUxMjF9.HHnoTM21G1JbqbvAMnIrOFH68UDHIK_XEBP6jd10CG8"

chai.use(chaiHttp);
chai.should();

// checking item
describe("Items", () => {

    describe("POST /", () => {
        it("should post items record", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "Android not IPhone 11 PRO MAX 512GB X 256GB X 64GB Original ALL Variant - Green Gray Silver Gold Oks",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    if (res.body.code === 400) {
                        res.should.have.status(400);
                    } else {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('data');
                        itemId = res.body.data._id;
                        res.body.message.should.includes('Item successfully registered');
                    }
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error duplicate item", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "Android not IPhone 11 PRO MAX 512GB X 256GB X 64GB Original ALL Variant - Green Gray Silver Gold Oks",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body);
                    res.body.errMsg.should.includes('E11000 duplicate key error collection: ecommerce.items index: name_1 dup key: { name: "Android not IPhone 11 PRO MAX 512GB X 256GB X 64GB Original ALL Variant - Green Gray Silver Gold Oks" }');
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error min name length 3 character", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "An",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body);
                    res.body.errMsg.should.includes('item name min length 3 character, ');
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error max name length 100 character", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body);
                    res.body.errMsg.should.includes('item name max length 50 character, ');
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error price is required", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "Selamat datang di VIP",
                    stock: "8",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body);
                    res.body.errMsg.should.includes('Price is required, ');
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error description is required", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "Selamat datang di VIP Cellular",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body);
                    res.body.errMsg.should.includes('description required, ');
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error description min 15 character", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "Selamat datang di VIP Cellular",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selama"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body);
                    res.body.errMsg.should.includes('item description min length 15 character, ')
                    done();
                });
        });
    });

    describe("POST /", () => {
        it("should show error description is max 500 character", (done) => {
            chai.request(app)
                .post('/api/items/register')
                .set('token', tokenOwner)
                .send({
                    name: "Selamat datang di VIP Cellular",
                    stock: "8",
                    price: "21790000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    owner: "5e26ddeb49c67b449a6a8e8c",
                    description: "Selama Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan " +
                        "terlebih dulu & dicantumkan pd catatan pembelia Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan " +
                        "kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap " +
                        "melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, " +
                        "kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya " +
                        "silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna, " +
                        "Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: " +
                        "64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body)
                    res.body.errMsg.should.includes('item description max length 500 character, ')
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should get all items record", (done) => {
            chai.request(app)
                .get('/api/items')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    // console.log(res.body);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should get the items you are looking for", (done) => {
            chai.request(app)
                .get('/api/items/iphone')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    // console.log(res.body);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should get the items you are looking for", (done) => {
            chai.request(app)
                .get('/api/items/foobar')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body)
                    res.body.errMsg.should.includes('data not found')
                    done();
                });
        });
    });

    describe("PUT /", () => {
        it("should update items record", (done) => {
            chai.request(app)
                .put('/api/items/' + itemId)
                .set('token', tokenOwner)
                .send({
                    name: "Android not IPhone BOS 11 PRO MAX 512GB X 256GB X 64GB Original ALL Variant - Green Gray Silver Gold Oks",
                    stock: "10",
                    price: "23000000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    // console.log(res.body)
                    res.body.message.should.includes('Item successfully updated');
                    done();
                });
        });
    });

    describe("PUT /", () => {
        it("should update items record", (done) => {
            chai.request(app)
                .put('/api/items/foobar')
                .set('token', tokenOwner)
                .send({
                    name: "Android not IPhone BOS 11 PRO MAX 512GB X 256GB X 64GB Original ALL Variant - Green Gray Silver Gold Oks",
                    stock: "10",
                    price: "23000000",
                    image: "https://s1.bukalapak.com/img/67377632361/w-1000/Apple_iPhone_11_PRO_MAX_512GB_x_256GB_x_64GB_Original_ALL_Va.png.webp",
                    description: "Selamat datang di VIP Cellular .READY STOK (Tipe , Warna , Kapasitas Memory Sesuai Judul dan gambar iklan)(dropship / reseler / stok toko Welcome)Varian Warna :Green Gray Silver GoldVarian Kapasitas: 64gb - 256gb - 512gbWarna , Versi atau lain nya silahkan ditanyakan, kami team VIP Cellular siap melayani(ketersediaan warna dan kapasitas , wajib ditanyakan terlebih dulu & dicantumkan pd catatan pembelia"
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errMsg');
                    // console.log(res.body)
                    res.body.errMsg.should.includes('data not found');
                    done();
                });
        });
    });

    describe("DELETE /", () => {
        it("should delete items record", (done) => {
            chai.request(app)
                .delete('/api/items/' + itemId)
                .set('token', tokenOwner)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    // console.log(res.body)
                    res.body.message.should.includes('Item successfully deleted');
                    done();
                });
        });
    });

});