const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log error for debugging

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
