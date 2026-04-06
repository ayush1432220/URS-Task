const express = require("express");

const feedbackController = require("../controllers/feedbackController");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const validateFeedbackRequest = require("../middlewares/validateFeedbackRequest");
const verifyApiKey = require("../middlewares/verifyApiKey");

const feedbackRouter = express.Router();

feedbackRouter.post(
  "/",
  verifyApiKey,
  validateFeedbackRequest,
  feedbackController.submitFeedback
);

feedbackRouter.get("/", authenticateAdmin, feedbackController.getFeedbackList);

module.exports = feedbackRouter;
