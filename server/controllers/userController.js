const User = require('../models/user'),
      Product = require('../models/product'),
      { validatePass } = require('../helpers/bcrypt'),
      { generateToken } = require('../helpers/jwt'),
      { OAuth2Client } = require('google-auth-library'),
      userErr = { status: 404, message: 'User not found'},
      loginErr = { status: 400, message: 'Incorrect email/password'},
      productErr = { status: 404, message: 'Product not found' },
      cartErr = { status: 400, message: 'Please input product ID and quantity' }

module.exports = class UserController {
  
  static register(req, res, next) {
    console.log(req.body)
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = generateToken(payload)
        res.status(201).json({ _id: user._id, name: user.name, email: user.email, image: user.image, isAdmin: user.isAdmin, access_token: token })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          next(loginErr);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = {
            id : user._id
          };
          let token = generateToken(payload);
          res.status(200).json({ _id: user._id, name: user.name, email: user.email, image: user.image, isAdmin: user.isAdmin, access_token: token })
        } else {
          next(loginErr);
        }
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    let personalInfo;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        personalInfo = ticket.getPayload()
        return User.findOne({ email: personalInfo.email })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            name: personalInfo.name,
            email: personalInfo.email,
            password: process.env.DEFAULT_PASSWORD,
            image: personalInfo.picture
          })
        }
      })
      .then(user => {
        let payload = {
          id: user._id,
          email: user.email
        }
        let token = generateToken(payload)
        res.status(200).json({access_token: token, name: user.name, id: user._id, image: user.image})
      })
      .catch(next)
  }

  static edit(req, res, next) {
    const { name } = req.body;
    User.findByIdAndUpdate(
      req.decoded.id,
      { name, image: req.file.cloudStoragePublicUrl },
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(user => {
        let newUser = user.toObject()
        delete newUser.password
        res.status(200).json(newUser)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let user;
    User.findById(req.params.id).select('-password')
      .then(data => {
        if (!data) {
          next(userErr)
        }
        user = data;
        return Product.find({ seller: user._id })
      })
      .then(products => {
        res.status(200).json({ _id: user._id, name: user.name, email: user.email, image: user.image, products })
      })
      .catch(next)
  }

  static findCart(req, res, next) {
    User.findById(req.decoded.id)
      .populate({
        path: 'cart.product',
        model: 'Product'
      })
      .then(user => {
        console.log(user)
        if (!user) {
          next(userErr)
        }
        res.status(200).json(user.cart)
      })
      .catch(next)
  }

  static addToCart(req, res, next) {
    // {
    //    product: 45rtuyio7o878,
    //    quantity: 3
    // }
    if (!req.body.product || !req.body.quantity) {
      next(cartErr)
    }
    let duplicate = 0, obj = {}
    obj.product = req.body.product
    obj.quantity = parseInt(req.body.quantity)
    Product.findById(req.body.product)
      .then(product => {
        if (!product) {
          throw productErr
        } else if (product.stock < req.body.quantity) {
          throw {status: 400, message: 'Insufficient stock for this product'}
        }
        product.stock -= req.body.quantity
        return product.save({ validateBeforeSave: false })
      })
      .then(product => {
        return User.findById(req.decoded.id)
      })
      .then(user => {
        if (!user) {
          throw userErr
        }
        user.cart.forEach(el => {
          if (String(el.product) === String(obj.product)) {
            duplicate++;
            el.quantity += obj.quantity;
          }
        })
        if (!duplicate) {
          user.cart.push(obj)
        }
        return user.save({ validateBeforeSave: false })
      })
      .then(user => {
        res.status(200).json(user.cart)
      })
      .catch(next)
  }

  static removeFromCart(req, res, next) {
    // {
    //    product: 45rtuyio7o878,
    //    quantity: 3
    // }
    if (!req.body.product || !req.body.quantity) {
      next(cartErr)
    }
    let duplicate = 0, report;
    User.findById(req.decoded.id)
      .then(user => {
        if (!user) {
          throw userErr
        }
        user.cart.forEach(el => {
          if (String(el.product) === String(req.body.product)) {
            duplicate++;
            el.quantity -= req.body.quantity;
          }
        })
        if (!duplicate) {
          throw productErr
        }
        return user.save({ validateBeforeSave: false })
      })
      .then(user => {
        report = user.cart;
        return Product.findById(req.body.product)
      })
      .then(product => {
        if (!product) {
          throw productErr
        }
        product.stock += req.body.quantity
        return product.save({ validateBeforeSave: false })
      })
      .then(product => {
        res.status(200).json(report)
      })
      .catch(next)
  }

  static emptyCart(req, res, next) {
    let queries = []
    User.findById(req.decoded.id)
      .then(user => {
        user.cart.forEach(el => {
          queries.push(Product.findByIdAndUpdate(
            el.product,
            { $inc: {stock: el.quantity} },
            { new: true }
          ))
        })
        return Promise.all(queries);
      })
      .then(data => {
        return User.findByIdAndUpdate(
          req.decoded.id,
          { $set: { cart: [] } },
          { new: true }
        )
      })
      .then(user => {
        if (!user) {
          next(userErr)
        }
        res.status(200).json(user.cart)
      })
      .catch(next)
  }
}
