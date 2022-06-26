const express = require("express");
const issueController = require("../controllers/issueController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authentication");

const router = express.Router();

router
  .route("/issue/new")
  .post(isAuthenticated, issueController.createNewIssue);

router.route("/my/issues").get(isAuthenticated, issueController.userIssues);

router
  .route("/admin/issues")
  .get(isAuthenticated, authorizeRoles("admin"), issueController.allIssues);

router
  .route("/admin/issue/edit/:id")
  .put(
    isAuthenticated,
    authorizeRoles("admin"),
    issueController.editIssueStatus
  );

module.exports = router;
