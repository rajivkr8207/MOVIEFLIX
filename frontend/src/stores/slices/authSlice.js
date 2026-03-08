import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/api/axios";


export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/auth')
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }

  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })

      // fetch user success
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      // fetch user fail
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

  }
});

export const {
  clearError,
  loginStart,
  loginSuccess,
  loginFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;