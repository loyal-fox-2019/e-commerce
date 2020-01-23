'use strict';
const { Customer } = require('../models');
const { sign } = require('../helpers/jwt');
const { compare } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library');
const Client = new OAuth2Client(process.env.GOOGLE_CLIENTID)

class CustomerController {
  static async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;
      const docs = {
        fullname,
        email,
        password,
      };
      const response = await Customer.create(docs);
      const { _id } = response;
      const payload = {
        id: _id,
        email,
        fullname,
      };
      const token = sign(payload);
      res.status(201).json({ fullname, email, token });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await Customer.findOne({ email })
      if(!response) {
        next({ auth: true, status: 400, message: 'Email or password is wrong' })
      } else {
        if(!compare(password, response.password)) {
          next({ auth: true, status: 400, message: 'Email or password is wrong' })
        } else {
          const { fullname } = response;
          const payload = {
            id: response._id,
            email,
            fullname,
          };
          const token = sign(payload);
          res.status(200).json({ fullname, email, token });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const googlePayload = await Client.verifyIdToken({ idToken: req.body.idToken, audience: process.env.GOOGLE_CLIENTID })
      const { name, email } = googlePayload.getPayload();
      const customer = await Customer.findOne({ email })
      if (!customer) {
        const register = await Customer.create({fullname: name, email, password: 'helloword122'})
        const { _id, fullname } = register
        const payload = {
          id: _id,
          email
        };
        const accessToken = sign(payload);
        res.status(200).json({ accessToken, fullname })
      } else {
        const { _id, fullname } = customer
        const payload = {
          id: _id,
          email,
        };
        const accessToken = sign(payload);
        res.status(200).json({ accessToken, fullname, email });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;