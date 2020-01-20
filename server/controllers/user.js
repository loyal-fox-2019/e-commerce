'use strict';
const { User } = require('../models');
const { sign } = require('../helpers/jwt');
const { compare } = require('../helpers/bcryptjs')

class UserController {
  static async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;
      const docs = {
        fullname,
        email,
        password,
      };
      const response = await User.create(docs);
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
      const user = await User.findOne({ email })
      if(!user) {
        next({ auth: true, status: 400, message: 'Email or password is wrong' })
      } else {
        if(!compare(password, user.password)) {
          next({ auth: true, status: 400, message: 'Email or password is wrong' })
        } else {
          const { fullname } = user;
          const payload = {
            id: user._id,
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
}

module.exports = UserController;