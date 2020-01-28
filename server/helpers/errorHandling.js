module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode;
  const message = err.message.toString();

  if (statusCode) {
    res.status(statusCode).json({ message });
  } else {
    res.status(500).json({ message: `Internal server error!` });
  }
};
