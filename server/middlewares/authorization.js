module.exports = (req, res, next) => {
  if (req.userData.userRole === 'admin') {
    next();
  } else {
    res.status(401);
    const err = Error(`Need admin access!`);
    next(err);
  }
};
