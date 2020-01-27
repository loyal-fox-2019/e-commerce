const { verifyToken } = require("../helpers/jwt");
module.exports = (req, res, next) => {
  let err = {};
  if (req.headers.token) {
    try {
      let payload = verifyToken(req.headers.token, process.env.JWT_SECRET);
      req.loginData = payload;
      next();
    } catch (err) {
      err.name = "Token";
      err.message = "Invalid Token";
      next(err);
    }
  } else {
    err.name = "Unauthorized";
    err.message = "Authentication Required";
    next(err);
  }
};
