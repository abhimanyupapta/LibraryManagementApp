import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  userIssues: [],
  isLoading: true,
  isAuth: false,
  error: null,
};

export const login = createAsyncThunk(
  "userSlice/login",
  async (input, thunkAPI) => {
    try {
      const { loginEmail, loginPassword } = input;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(
        "/api/v1/login",
        { loginEmail, loginPassword },
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

export const signUp = createAsyncThunk(
  "userSlice/signUp",
  async (input, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multi-part",
        },
      };
      const resp = await axios.post("/api/v1/register", input[0], config);
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "userSlice/loadUser",
  async (_, thunkAPI) => {
    try {
      const resp = await axios("/api/v1/me");
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "userSlice/logout",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/api/v1/logout");
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.isAuth = false;
      })
      .addCase(loadUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.userIssues = action.payload.userIssues;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.isAuth = false;
      })
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.isAuth = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {};
        state.isAuth = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        state.isAuth = true;
      });
  },
});

export default userSlice;
