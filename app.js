const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./config/db");
app.use(bodyParser.json());

/* route middleware */
app.use("/", require("./routes/api/v1/index"));
app.all("*", (req, res, next) => {
  const err = new Error(
    `requested url doesn't match ${req.path} not found....`
  );
  err.statusCode = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: 0,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
