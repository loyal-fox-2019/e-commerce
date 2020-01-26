module.exports = (err, req, res, next) => {
  if (err.name === "Validataion Login") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Not Found") {
    res.status(404).json({ message: err.message });
  } else if (err.name === "Token Validation") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Token") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "Unauthorized") {
    res.status(401).json({ message: err.message });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: "Internal Sever Error" });
  }
};
