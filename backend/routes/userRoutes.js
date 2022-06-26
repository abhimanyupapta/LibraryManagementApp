const express = require("express");
const userController = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);

router.route("/logout").get(isAuthenticated, userController.logoutUser);

router.route("/forgotPassword").post(userController.forgotPassword);

router.route("/password/reset/:token").put(userController.resetPassword);

router.route("/t").get((req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

module.exports = router;
