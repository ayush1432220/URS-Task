const express = require("express");

const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const cors = require("cors");

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use((request, response, next) => {
  // Keep default hardening lightweight without adding extra dependencies.
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  next();
});

app.get("/api/health", (request, response) => {
  response.status(200).json({
    success: true,
    message: "Feedback service is running.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
