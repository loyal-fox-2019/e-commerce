const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class userController {
  static register(req, res, next) {
    const payload = {}
    let access_token = ''
    const { username, email, password } = req.body
    User.create({ username, email, password })
    .then(user => {
      payload._id = user._id
      payload.email = user.email
      access_token = generateToken(payload);
      res.status(201).json({ access_token, email })
    })
    .catch(next)
  }
  
  static login(req, res, next) {
    const payload = {};
    let access_token = '';
    const { email, password } = req.body;
    if (!email) throw { code: 400, message: "email must be filled out" }
    if (!password) throw { code: 400, message: "password must be filled out" }
    User.findOne({ email })
      .then(user => {
        if (user) {
          if (checkPassword(password, user.password)) {
            payload._id = user._id;
            payload.email = user.email;
            access_token = generateToken(payload);
            res.status(200).json({ access_token, email })
          } else {
            throw { code: 400, message: "invalid password" }
          }
        } else {
          throw { code: 400, message: "email is not registered" }
        }
      })
      .catch(next)
      
  }
}

module.exports = userController;