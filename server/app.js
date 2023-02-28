var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var heroesRouter = require("./routes/hero");
var authRouter = require("./routes/auth");

const initDatabase = require("./config/initDatabase");

var app = express();

initDatabase();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [
      "https://test.app",
      "http://localhost:4200",
      process.env.WEB_URL,
    ],
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
    maxAge: 3600,
  })
);

app.use("/api/heroes", heroesRouter);
app.use("/api/auth", authRouter);
app.use("*", async (req, res) => {
  res.status(404).send("404 not found");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

module.exports = app;
