const authService = require("../services/authService");
const HTTP_STATUS = require("../constants/httpStatus");

const loginAdmin = (request, response) => {
  const accessToken = authService.authenticateAdmin(request.body);

  return response.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Authentication successful.",
    data: {
      accessToken,
      tokenType: "Bearer",
    },
  });
};

module.exports = {
  loginAdmin,
};
