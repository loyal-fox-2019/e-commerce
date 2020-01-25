const userModel = require("../models/user");

module.exports = (req, res, next) => {
  let err = {};
  if (req.loginData.role !== "Admin") {
    err.name = "Unauthorized";
    err.message = "Required Admin Role";
    next(err);
  } else {
    next();
  }
};
