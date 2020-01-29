const errorHelper = require("../helpers/errorHandling");

module.exports = function (err, req, res, next) {
  console.log(`===masuk error handler====`)
  console.log(err.stack)
  const errorToSend = errorHelper(err);
  res.status(errorToSend.statusCode);
  res.json(errorToSend);
}