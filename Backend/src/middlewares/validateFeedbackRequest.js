const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateFeedbackRequest = (request, response, next) => {
  const { name, email, message } = request.body || {};
  const validationErrors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    validationErrors.push("Name is required and must contain at least 2 characters.");
  }

  if (!email || typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    validationErrors.push("Email is required and must be a valid email address.");
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    validationErrors.push("Message is required and must contain at least 10 characters.");
  }

  if (validationErrors.length > 0) {
    return next(
      new AppError(
        "Feedback validation failed.",
        HTTP_STATUS.BAD_REQUEST,
        validationErrors
      )
    );
  }

  return next();
};

module.exports = validateFeedbackRequest;
