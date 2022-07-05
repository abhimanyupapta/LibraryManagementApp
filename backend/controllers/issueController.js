const Issue = require("../models/issueModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Cart = require("../models/cartModel");

//create new issue
exports.createNewIssue = catchAsyncErrors(async (req, res, next) => {
  const { books, issuedTill } = req.body;

  if (new Date(issuedTill) > Date.now()) {
    const issue = await Issue.create({
      books,
      issuedTill,
      user: req.user._id,
    });

    const cart = await Cart.findOne({ user: req.user._id });

    cart.books.splice(0, cart.books.length);

    await cart.save();

    res.status(200).json({
      success: true,
      issue,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "invalid date",
    });
  }
});

//user issues
exports.userIssues = catchAsyncErrors(async (req, res, next) => {
  const issues = await Issue.find({ user: req.user._id });

  if (issues.length === 0) {
    return next(new ErrorHandler(`no issues found`, 404));
  }

  res.status(200).json({
    success: true,
    issues,
  });
});

//all issues -- admin
exports.allIssues = catchAsyncErrors(async (req, res, next) => {
  const issues = await Issue.find();

  if (issues.length === 0) {
    return next(new ErrorHandler(`no issues found`, 404));
  }

  res.status(200).json({
    success: true,
    issues,
  });
});

//edit issue status -- admin
exports.editIssueStatus = catchAsyncErrors(async (req, res, next) => {
  const issueId = req.params.id;

  const { status } = req.body;

  let issue = await Issue.findById(issueId);

  if (!issue) {
    return next(new ErrorHandler(`issue not found`, 404));
  }

  issue.status = status;

  await issue.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    issue,
  });
});
