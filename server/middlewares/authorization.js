const Token = require('../helpers/token');

module.exports = (req, res, next) => {
  const { token } = req.headers;

  try {
    const payload = Token.verify(token);
    req.userData = payload;
    next();
  } catch (err) {
    res.status(403);
    next(err);
  }
};
