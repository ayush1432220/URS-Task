const HTTP_STATUS = require("../constants/httpStatus");

const notFoundHandler = (request, response) => {
  response.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${request.method} ${request.originalUrl} was not found.`,
  });
};

module.exports = notFoundHandler;
