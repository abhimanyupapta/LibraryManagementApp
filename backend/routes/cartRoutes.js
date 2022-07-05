const express = require("express");
const cartController = require("../controllers/cartController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/cart/add").post(isAuthenticated, cartController.postCart);

router.route("/cart/get").get(isAuthenticated, cartController.getCart);

router.route("/cart/del/:id").delete(isAuthenticated, cartController.delItem);

module.exports = router;
