exports.getTime = (req, res, next) => {
  req.getTime = new Date().toLocaleDateString();
  next();
};

exports.showTime = (req, res, next) => {
  console.log(`Show Time: ${req.getTime}`);
  res.send(`Show Time: ${req.getTime}`);
  // next();
};
