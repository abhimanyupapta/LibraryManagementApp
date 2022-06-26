const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  books: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      book: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: true,
      },
    },
  ],
  status: {
    type: String,
    default: "issued",
  },
  issuedTill: {
    type: Date,
    required: true,
  },
  issuedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Issue", issueSchema);
