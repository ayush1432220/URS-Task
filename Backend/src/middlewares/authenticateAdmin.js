const environment = require("../config/environment");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");
const { verifyAccessToken } = require("../utils/tokenManager");

const authenticateAdmin = (request, response, next) => {
  const authorizationHeader = request.headers.authorization || "";

  if (!authorizationHeader.startsWith("Bearer ")) {
    return next(
      new AppError(
        "Unauthorized request. Bearer token is required.",
        HTTP_STATUS.UNAUTHORIZED
      )
    );
  }

  const accessToken = authorizationHeader.replace("Bearer ", "").trim();

  try {
    const tokenPayload = verifyAccessToken({
      token: accessToken,
      secret: environment.accessTokenSecret,
    });

    request.authenticatedUser = tokenPayload;
    return next();
  } catch (error) {
    return next(
      new AppError(error.message, HTTP_STATUS.UNAUTHORIZED)
    );
  }
};

module.exports = authenticateAdmin;
