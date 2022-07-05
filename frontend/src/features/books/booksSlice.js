import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  bookCount: 0,
  resultPerPage: 0,
  filteredBooksCount: 0,
  isLoading: true,
  error: null,
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (input, thunkAPI) => {
    try {
      const { keyword, currentPage, ratings, category } = input;

      let link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/books?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`;
      }

      const resp = await axios.get(link);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        state.bookCount = action.payload.bookCount;
        state.filteredBooksCount = action.payload.filteredBooksCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //   .addCase(loadUser.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.isAuth = false;
    //   })
    //   .addCase(loadUser.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = action.payload.user;
    //     state.isAuth = true;
    //     state.error = null;
    //   })
    //   .addCase(loadUser.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload.message;
    //     state.isAuth = false;
    //   })
    //   .addCase(signUp.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.isAuth = false;
    //   })
    //   .addCase(signUp.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = action.payload.user;
    //     state.isAuth = true;
    //     state.error = null;
    //   })
    //   .addCase(signUp.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload.message;
    //     state.isAuth = false;
    //   })
    //   .addCase(logout.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.isAuth = true;
    //   })
    //   .addCase(logout.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = {};
    //     state.isAuth = false;
    //     state.error = null;
    //   })
    //   .addCase(logout.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload.message;
    //     state.isAuth = true;
    //   });
  },
});

export default booksSlice;
