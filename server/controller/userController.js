const User = require('../models/User');
const { comparePassword } = require('../helpers/bcrypt');
const { encryptToken, decryptToken } = require('../helpers/tokenHandler');

function composeReturn(token, result) {
  console.log("masuk return")
  return {
    token: token,
    name: result.name,
    imageUrl: result.imageUrl
  }
}

class userController {
  // register
  static register(req, res, next) {
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    console.log(body);
    User.create(body)
      .then((result) => {
        console.log(result);
        const token = encryptToken({
          _id: result._id,
          email: result.email
        });
        res.status(201);
        res.json(composeReturn(token, result));
      })
      .catch((err) => {
        err.status = 400;
        next(err);
      });
  }
  // login
  static login(req, res, next) {
    const body = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      email: body.email
    })
    .then((result) => {
      if (!result) {
        throw new Error("Email or Password wrong");
      }
      else {
        const isValid = comparePassword(body.password, result.password);
        if (!isValid) {
          throw new Error("Email or Password wrong");
        }
        else {
          const token = encryptToken({
            _id: result._id,
            email: result.email
          });
          res.status(200);
          res.json(composeReturn(token, result));
        }
      }
    }).catch((err) => {
      err.status = 400;
      next(err);
    });
  }
}

module.exports = userController;