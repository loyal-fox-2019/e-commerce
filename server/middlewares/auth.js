const User = require('../models/User');
const { decryptToken } = require('../helpers/tokenHandler');

module.exports = {
  authentication: function (req, res, next) {
    const { token } = req.headers;
    // trying JWT
    try {
      const decryptedToken = decryptToken(token);
      // checking token
      if (!token) {
        throw new Error("Token not found");
      }
      else {
        const { id } = decryptToken;
        User.findOne({
          _id: id
        })
          .then((foundUser) => {
            // checking User
            if (!foundUser) {
              throw new Error("User not found");
            }
            else {
              res.locals.user = foundUser;
              next();
            }
          })
          .catch((err) => {
            next(err);
          });
      }
    } catch (err) {
      next(err);
    }
  },
  adminOnly: function (req, res, next) {
    const loginUser = res.locals.user;
    if (loginUser && loginUser.role === "admin") {
      next()
    }
    else {
      const err = new Error("Not Authorized");
      next(err);
    }
  },
  customerOnly: function (req, res, next) {
    const loginUser = res.locals.user;
    if (loginUser && loginUser.role === "customer") {
      next()
    }
    else {
      const err = new Error("Not Authorized");
      next(err);
    }
  }
};
