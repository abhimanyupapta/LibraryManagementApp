const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Cart", cartSchema);
