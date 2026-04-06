const HTTP_STATUS = require("../constants/httpStatus");

const errorHandler = (error, request, response, next) => {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isServerError = statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR;

  if (isServerError) {
    console.error("Unhandled error:", error);
  }

  response.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error.",
    ...(error.details && error.details.length > 0
      ? { errors: error.details }
      : {}),
  });
};

module.exports = errorHandler;
