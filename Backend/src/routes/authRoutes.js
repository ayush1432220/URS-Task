const express = require("express");

const authController = require("../controllers/authController");
const AppError = require("../utils/appError");
const HTTP_STATUS = require("../constants/httpStatus");

const authRouter = express.Router();

authRouter.post("/login", (request, response, next) => {
  const { email, password } = request.body || {};

  if (!email || !password) {
    return next(
      new AppError(
        "Email and password are required for authentication.",
        HTTP_STATUS.BAD_REQUEST
      )
    );
  }

  return authController.loginAdmin(request, response, next);
});

module.exports = authRouter;
