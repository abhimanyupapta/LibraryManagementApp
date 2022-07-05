import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  totalLikes: 0,

  isLoading: true,
  error: null,
};

export const likeBook = createAsyncThunk(
  "like/likeBook",
  async (input, thunkAPI) => {
    try {
      const { bookId, csrfToken } = input;
      console.log(csrfToken);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      };
      const resp = await axios.post("/api/v1/books/like", { bookId }, config);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(likeBook.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likeBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalLikes = action.payload.TotalLikes;

        state.error = null;
      })
      .addCase(likeBook.rejected, (state, action) => {
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

export default likeSlice;
