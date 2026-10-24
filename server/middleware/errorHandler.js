function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "The provided data is invalid.",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with that information already exists.",
    });
  }

  console.error("API error:", err.message);

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
}

module.exports = { notFound, errorHandler };