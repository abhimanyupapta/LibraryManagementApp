import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  book: {},
  iniLikes: 0,
  isLoading: true,
  error: null,
};

export const getBook = createAsyncThunk(
  "bookDetails/getbook",
  async (bookId, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/books/${bookId}`);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const bookDetailSlice = createSlice({
  name: "bookDeatils",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getBook.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload.book;
        state.iniLikes = action.payload.iniLikes;
        state.error = null;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookDetailSlice;
