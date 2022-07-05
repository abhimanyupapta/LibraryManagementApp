const Cart = require("../models/cartModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Book = require("../models/bookModel");
const { findOne } = require("../models/cartModel");

exports.postCart = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.body;

  const book = await Book.findById(bookId);

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    let present = false;
    cart.books.forEach((b) => {
      if (b.book.toString() === bookId) {
        present = true;
      }
    });
    if (present) {
      return next(Error(`Book already in issuing cart`, 500));
    } else {
      cart.books.push({
        name: book.name,
        image: book.image.image_url,
        book: bookId,
      });
    }
  } else {
    cart = await Cart.create({
      user: req.user._id,
      books: [{ name: book.name, image: book.image.image_url, book: bookId }],
    });
  }

  await cart.save();

  res.status(200).json({ success: true });
});

exports.getCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return next(ErrorHandler(`Cart not found`, 404));
  else {
    res.status(200).json({
      success: true,
      cart,
    });
  }
});

exports.delItem = catchAsyncErrors(async (req, res, next) => {
  const bookId = req.params.id;

  let cart = await Cart.findOne({ user: req.user._id });

 
  result = cart.books.filter((b, ind, arr) => {
    return  b.book.toString() !== req.params.id.toString();
  });

  
 cart.books = [...result];

  await cart.save();

  res.status(200).json({
    success: true,
    cart,
  });
});
