const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')
const Item = require('../models/item')

chai.use(chaiHttp)

describe('/items', function() {
  after(async function() {
    await Item.deleteMany({})
  })

  describe('POST /items', function() {
    it('should return message - (code: 201)', async function() {
      const data = {
        name: 'Sendok',
        price: 15000,
        stock: 100,
        image: 'dummy image',
      }

      const response = await chai
        .request(app)
        .post('/items')
        .send(data)

      expect(response).to.have.status(201)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal('Item added')
    })
  })

  describe('GET /items', function() {
    it('should return array of object contain item object - (code: 200)', async function() {
      const response = await chai.request(app).get('/items')

      expect(response).to.have.status(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('items')
      expect(response.body.items).to.be.an('array')
      expect(response.body.items[0]).to.be.an('object')
      expect(response.body.items[0].name).to.equal('Sendok')
      expect(response.body.items[0].stock).to.equal(100)
      expect(response.body.items[0].price).to.equal(15000)
      expect(response.body.items[0].image).to.equal('dummy image')
    })
  })

  describe('PATCH /items', function() {
    let newItem = null

    before(async function() {
      newItem = await Item.create({
        name: 'Garpu',
        stock: 100,
        price: 15000,
        image: 'dummy image',
      })
    })

    it('should update item -(code: 200)', async function() {
      const response = await chai
        .request(app)
        .patch(`/items/${newItem.id}`)
        .send({
          name: 'Garpu tala',
          stock: 99,
          price: 12500,
          image: 'not so dummy image',
        })

      expect(response).to.have.status(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal('Item updated')
    })
  })

  describe('DELETE /items', function() {
    let newItem = null

    before(async function() {
      newItem = await Item.create({
        name: 'Garpu',
        stock: 100,
        price: 15000,
        image: 'dummy image',
      })
    })

    it('should delete item - (code: 200)', async function() {
      const response = await chai.request(app).delete(`/items/${newItem.id}`)

      expect(response).to.have.status(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal('Item deleted')
    })

    it('should return error item not found - (code: 404)', async function() {
      const response = await chai.request(app).delete(`/items/${newItem.id}`)

      expect(response).to.have.status(404)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.equal('Item not found')
    })
  })
})
