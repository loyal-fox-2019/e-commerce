const jwt = require("jsonwebtoken");
function authenticate(req, res, next) {
  try {
    req.userInfo = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json(error);
  }
}

module.exports = authenticate;
