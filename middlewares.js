const notFound = (req, res, next) => {
  res.status(404);
  console.log("Not Found - ", req.originalUrl);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(res.statusCode);
  console.log(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
