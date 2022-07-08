const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route imports
const user = require("./routes/userRoutes");
const book = require("./routes/bookRoutes");
const issue = require("./routes/issueRoutes");
const cart = require("./routes/cartRoutes");

app.use("/api/v1/", user);
app.use("/api/v1/", book);
app.use("/api/v1/", issue);
app.use("/api/v1/", cart);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
