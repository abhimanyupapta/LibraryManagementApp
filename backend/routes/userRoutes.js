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

router.route("/me").get(isAuthenticated, userController.userProfile);

router.route("/api/v1/getCSRFToken").get((req, res) => {
  res.json({
    csrfToken: req.csrfToken(),
  });
});

module.exports = router;
