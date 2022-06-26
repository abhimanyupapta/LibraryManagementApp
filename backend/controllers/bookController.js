const Book = require("../models/bookModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apiFeatures");

// Create book -- admin
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  const image = req.body.image;

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "books",
  });

  const imageLink = {
    public_id: result.public_id,
    imageUrl: result.secure_url,
  };

  req.body.image = imageLink;

  const book = await Book.create(req.body);
  res.status(200).json({
    success: true,
    book,
  });
});

// get all books
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 3;
  const bookCount = await Book.countDocuments();
  const apiFeature = new ApiFeatures(Book.find(), req.query).search().filter();

  let books = await apiFeature.query;

  let filteredBooksCount = books.length;

  apiFeature.pagination(resultPerPage);

  books = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    books,
    bookCount,
    resultPerPage,
    filteredBooksCount,
  });
});

//delete book -- admin
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler(`Book not found`, 404));
  }

  await cloudinary.v2.uploader.destroy(book.image.public_id);

  await book.remove();

  res.status(200).json({
    success: true,
    message: `Book deleated`,
  });
});

//edit book -- admin
exports.editBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) return next(new ErrorHandler(`Book not found`, 404));

  const image = req.body.image;

  if (image !== undefined) {
    await cloudinary.v2.uploader.destroy(book.image.public_id);
  }

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "books",
  });

  const imageLinks = {
    public_id: result.public_id,
    imageUrl: result.secure_url,
  };

  req.body.image = imageLinks;

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    book,
  });
});

// Like book
exports.likeBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.body;

  const userId = req.user._id;

  const book = await Book.findById(bookId);

  const like = {
    user: userId,
  };

  let result = book.likes;

  const isLiked = await book.likes.find(
    (l) => l.user.toString() === req.user._id.toString()
  );

  if (isLiked) {
    result = book.likes.filter((l, ind, arr) => {
      l.user.toString() !== req.user._id.toString();
    });
  } else {
    result.push(like);
  }

  const TotalLikes = result.length;

  book.likes = [...result];

  await book.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    TotalLikes,
  });
});

// Review book
exports.reviewBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId, comment } = req.body;

  const userId = req.user._id;

  const book = await Book.findById(bookId);

  const review = {
    user: userId,
    name: req.user.name,
    comment: comment,
  };

  const isReviewed = await book.reviews.find(
    (l) => l.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    book.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.comment = comment;
      }
    });
  } else {
    book.reviews.push(review);
  }

  const TotalReviews = book.reviews.length;

  book.numOfReviews = TotalReviews;

  await book.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    TotalReviews,
  });
});
