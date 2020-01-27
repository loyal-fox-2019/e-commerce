const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { deleteProducts } = require('../helpers/testHelpers')

chai.use(chaiHttp)

// describe('/products', function() {
//   after(async function() {
//     await deleteProducts();
//   })

//   describe('GET /', function() {

//     it('should return array of all products in database with status code 200', done => {
//       chai
//         .request(app)
//         .get('/products')
//         .end((err, res) => {
//           if (err) {
//             done(err)
//           } else {
//             expect(res).to.have.status(200)
//             expect(res.body).to.be.an('array')
//             expect(res.body).to.have.keys(['access_token', 'name'])
//             expect(res.body.name).to.equal(data.name)
//             expect(res.body.access_token).to.have.lengthOf.gt(10)
//           }
//         })

//     })
//   })
// })