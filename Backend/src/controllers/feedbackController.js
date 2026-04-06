const feedbackService = require("../services/feedbackService");
const HTTP_STATUS = require("../constants/httpStatus");

const submitFeedback = (request, response) => {
  const feedback = feedbackService.createFeedback(request.body);

  return response.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Feedback submitted successfully.",
    data: feedback,
  });
};

const getFeedbackList = (request, response) =>
  response.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Feedback records fetched successfully.",
    data: feedbackService.getAllFeedback(),
  });

module.exports = {
  submitFeedback,
  getFeedbackList,
};
