const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const User = require("./models/userModel");
const fileUpload = require("express-fileupload");
const app = express();

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "session",
});
const csrfProtection = csrf();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//creating session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  console.log(req.csrfToken());
  next();
});

//extracting user model from session
app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

//route imports
const user = require("./routes/userRoutes");
const book = require("./routes/bookRoutes");
const issue = require("./routes/issueRoutes");

app.use("/api/v1/", user);
app.use("/api/v1/", book);
app.use("/api/v1/", issue);

//middleware for errors
app.use(errorMiddleware);

module.exports = app;