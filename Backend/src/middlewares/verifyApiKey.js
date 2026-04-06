const authService = require("../services/authService");
const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");

const verifyApiKey = (request, response, next) => {
  const providedApiKey = request.headers["x-api-key"];

  if (!authService.isValidApiKey(providedApiKey)) {
    return next(
      new AppError(
        "Unauthorized request. A valid x-api-key header is required.",
        HTTP_STATUS.UNAUTHORIZED
      )
    );
  }

  return next();
};

module.exports = verifyApiKey;
