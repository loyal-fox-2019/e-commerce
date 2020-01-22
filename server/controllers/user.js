const { User } = require('../models');
const Token = require('../helpers/token');
const Hash = require('../helpers/hash');

class UserController {
  // register
  static register(req, res, next) {
    // res.json(req.body);
    const { email, password } = req.body;

    User.create({ email, password })
      .then(user => {
        const { _id: userId } = user;

        res.status(201).json({
          message: `User has been successfully created!`,
          token: Token.generate({ userId })
        });
      })
      .catch(err => next(err));
  }

  // login
  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(403);
          throw new Error(`Email or password is invalid!`);
        } else {
          const { _id: userId, password: hash } = user;

          if (!Hash.verify(password, hash)) {
            res.status(403);
            throw new Error(`Email or password is invalid!`);
          } else {
            res.status(200).json({
              message: `User has found!`,
              token: Token.generate({ userId })
            });
          }
        }
      })
      .catch(err => next(err));
  }

  static getUserProfile(req, res, next) {
    User.findById(req.userData.userId)
      .then(user => {
        if (!user) {
          res.status(404);
          throw new Error(`User doesn't exist!`);
        } else {
          res.status(200);
          res.json({
            message: `Fetch user profile SUCCESS!`,
            data: {
              username: user.username,
              email: user.email,
              avatar: user.avatar
            }
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = UserController;
