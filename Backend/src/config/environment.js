const environment = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  feedbackApiKey: process.env.FEEDBACK_API_KEY || "feedback-submit-secret",
  adminEmail: process.env.ADMIN_EMAIL || "admin@feedback.local",
  adminPassword: process.env.ADMIN_PASSWORD || "Admin@123",
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET || "replace-this-secret-in-production",
  accessTokenExpiresInMinutes:
    Number(process.env.ACCESS_TOKEN_EXPIRES_IN_MINUTES) || 60,
};

module.exports = environment;
