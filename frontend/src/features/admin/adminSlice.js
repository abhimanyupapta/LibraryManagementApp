import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isIssuesLoading: true,
  allIssues: [],
  newBook: {},
  allBooks: [],
  adminError: null,
};

// export const postIssue = createAsyncThunk(
//   "issue/postIssue",
//   async (input, thunkAPI) => {
//     try {
//       const { books, issuedTill, csrfToken } = input;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRF-TOKEN": csrfToken,
//         },
//       };
//       const resp = await axios.post(
//         "/api/v1/issue/new",
//         { books, issuedTill },
//         config
//       );
//       return resp.data;
//     } catch (err) {
//       if (!err.response) {
//         throw err;
//       }

//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

export const getAllIssues = createAsyncThunk(
  "admin/getAllIssues",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/api/v1/admin/issues");
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const editIssue = createAsyncThunk(
  "admin/editIssue",
  async (input, thunkAPI) => {
    try {
      const { id, status, csrfToken } = input;

      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      };
      const resp = await axios.put(
        `/api/v1/admin/issue/edit/${id}`,
        { status },
        config
      );
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "admin/deleteBook",
  async (input, thunkAPI) => {
    try {
      const { id, csrfToken } = input;

      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
      };
      const resp = await axios.delete(`/api/v1/admin/book/${id}`, config);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllBooks = createAsyncThunk(
  "admin/getAllBooks",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(`/api/v1/admin/books`);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addBook = createAsyncThunk(
  "admin/addBook",
  async (input, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": input[1],
        },
      };
      const resp = await axios.post(`/api/v1/admin/book/new`, input[0], config);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,

  extraReducers(builder) {
    builder
      .addCase(getAllIssues.pending, (state, action) => {
        state.isIssuesLoading = true;
      })
      .addCase(getAllIssues.fulfilled, (state, action) => {
        state.isIssuesLoading = false;
        state.allIssues = action.payload.issues;
        state.adminError = null;
      })
      .addCase(getAllIssues.rejected, (state, action) => {
        state.isIssuesLoading = false;
        state.adminError = action.payload.message;
      })
      .addCase(editIssue.pending, (state, action) => {
        state.isIssuesLoading = true;
      })
      .addCase(editIssue.fulfilled, (state, action) => {
        state.isIssuesLoading = false;

        state.adminError = null;
      })
      .addCase(editIssue.rejected, (state, action) => {
        state.isIssuesLoading = false;
        state.adminError = action.payload.message;
      })
      .addCase(deleteBook.pending, (state, action) => {
        state.isIssuesLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isIssuesLoading = false;

        state.adminError = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isIssuesLoading = false;
        state.adminError = action.payload.message;
      })
      .addCase(getAllBooks.pending, (state, action) => {
        state.isIssuesLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isIssuesLoading = false;
        state.allBooks = action.payload.books;
        state.adminError = null;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isIssuesLoading = false;
        state.adminError = action.payload.message;
      })
      .addCase(addBook.pending, (state, action) => {
        state.isIssuesLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isIssuesLoading = false;

        state.adminError = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isIssuesLoading = false;
        state.adminError = action.payload.message;
      });
  },
});

export default adminSlice;
