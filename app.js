var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/error");

var usersRouter = require("./routes/users");
const uploadImage = require("./routes/uploadImages");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", usersRouter);
app.use("/api/upload", uploadImage);

//unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// error handler
app.use(globalErrorHandler);

module.exports = app;
