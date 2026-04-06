const feedbackStore = require("../data/feedbackStore");
const Feedback = require("../models/feedbackModel");

const createFeedback = ({ name, email, message }) => {
  const feedback = new Feedback({
    id: feedbackStore.length + 1,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  });

  feedbackStore.push(feedback);

  return feedback;
};

const getAllFeedback = () => [...feedbackStore];

module.exports = {
  createFeedback,
  getAllFeedback,
};
