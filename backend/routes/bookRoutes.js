const express = require("express");
const bookController = require("../controllers/bookController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authentication");

const router = express.Router();

//create new book -- admin
router
  .route("/admin/book/new")
  .post(isAuthenticated, authorizeRoles("admin"), bookController.createBook);

//deleteBook -- admin
router
  .route("/admin/book/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), bookController.deleteBook)
  .put(isAuthenticated, authorizeRoles("admin"), bookController.editBook);

//get all books
router.route("/books").get(isAuthenticated, bookController.getAllBooks);

//get all books--admin
router.route("/admin/books").get(isAuthenticated, authorizeRoles("admin"), bookController.getAllBooksAdmin);

//get book details
router.route("/books/:id").get(isAuthenticated, bookController.getBookDetails);

//like Book
router.route("/books/like").post(isAuthenticated, bookController.likeBook);

//review Book
router.route("/books/review").post(isAuthenticated, bookController.reviewBook);

module.exports = router;
