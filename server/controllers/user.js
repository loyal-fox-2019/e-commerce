const Model = require("../models/user");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class User {
  static register(req, res, next) {
    Model.create({
      full_name: req.body.full_name,
      email: req.body.email,
      password: req.body.password
    })
      .then(created => {
        const token = generateToken({
          id: created._id,
          name: created.full_name,
          role: created.role
        });
        res.status(201).json({ token: token });
      })
      .catch(next);
  }
  static login(req, res, next) {
    const err = {
      name: "Validataion Login",
      message: "Email / Password Wrong"
    };
    Model.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let passwordMatch = comparePassword(req.body.password, user.password);
          if (passwordMatch) {
            const token = generateToken({
              id: user._id,
              name: user.full_name,
              role: user.role
            });
            res.status(200).json({ token: token });
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      })
      .catch(next);
  }
  static adminLogin(req, res, next) {
    const err = {
      name: "Validataion Login",
      message: "Email / Password Wrong"
    };
    Model.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          let passwordMatch = comparePassword(req.body.password, user.password);
          if (passwordMatch) {
            const token = generateToken({
              id: user._id,
              name: user.full_name,
              role: user.role
            });
            if (user.role === "Admin") {
              res.status(200).json({ token: token });
            } else {
              err.name = "Unauthorized";
              err.message = "Admin Role Required";
              throw err;
            }
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      })
      .catch(next);
  }
}

module.exports = User;
