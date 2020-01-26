const Token = require('../helpers/token');

module.exports = (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  try {
    const payload = Token.verify(token);
    req.userData = payload;
    next();
  } catch (err) {
    console.log(err.stack);
    res.status(403);
    next(err);
  }
};
