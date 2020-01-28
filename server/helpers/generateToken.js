const jwt = require("jsonwebtoken");
function generateToken(userData) {
  const token = jwt.sign(userData, process.env.JWT_SECRET);
  return token;
}

module.exports = generateToken;
