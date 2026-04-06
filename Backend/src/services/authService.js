const crypto = require("crypto");

const environment = require("../config/environment");
const AppError = require("../utils/appError");
const { createAccessToken } = require("../utils/tokenManager");
const HTTP_STATUS = require("../constants/httpStatus");

const safeCompare = (firstValue, secondValue) => {
  const firstBuffer = Buffer.from(firstValue || "");
  const secondBuffer = Buffer.from(secondValue || "");

  if (firstBuffer.length !== secondBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(firstBuffer, secondBuffer);
};

const authenticateAdmin = ({ email, password }) => {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "");

  // Constant-time comparison helps reduce credential probing through timing differences.
  const isAuthorizedUser =
    safeCompare(normalizedEmail, environment.adminEmail.toLowerCase()) &&
    safeCompare(normalizedPassword, environment.adminPassword);

  if (!isAuthorizedUser) {
    throw new AppError(
      "Invalid admin credentials.",
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  return createAccessToken({
    subject: "admin",
    email: normalizedEmail,
    expiresInMinutes: environment.accessTokenExpiresInMinutes,
    secret: environment.accessTokenSecret,
  });
};

const isValidApiKey = (apiKey) =>
  safeCompare(String(apiKey || ""), environment.feedbackApiKey);

module.exports = {
  authenticateAdmin,
  isValidApiKey,
};
