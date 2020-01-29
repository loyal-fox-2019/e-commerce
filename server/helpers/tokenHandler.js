const jwt = require("jsonwebtoken");

module.exports = {
  encryptToken(objectData) {
    return jwt.sign(objectData, process.env.JWT_TOKEN_SECRET, { expiresIn: "5h" })
  },
  decryptToken(token) {
    if (!token) {
      throw new Error("Token is undefined")
    }
    const encrypted = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    return encrypted;
  }
}