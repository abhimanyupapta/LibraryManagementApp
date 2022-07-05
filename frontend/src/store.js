import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import booksSlice from "./features/books/booksSlice";
import csrfTokenSlice from "./features/csrfTokenSlice";
import likeSlice from "./features/books/likeSlice";
import bookDetailSlice from "./features/books/bookDetailSlice";
import reviewSlice from "./features/books/reviewSlice";
import cartSlice from "./features/cart/cartSlice";
import issueSlice from "./features/issue/issueSlice";
import adminSlice from "./features/admin/adminSlice";
export const store = configureStore({
  reducer: {
    csrf: csrfTokenSlice.reducer,
    user: userSlice.reducer,
    books: booksSlice.reducer,
    like: likeSlice.reducer,
    bookDetails: bookDetailSlice.reducer,
    review: reviewSlice.reducer,
    cart: cartSlice.reducer,
    issue: issueSlice.reducer,
    admin: adminSlice.reducer,
  },
});
