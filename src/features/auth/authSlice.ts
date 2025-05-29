import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState, LoginInput } from "../../utils/Types";
import { loginUser } from "./fetch_helper";

export const login = createAsyncThunk(
  "auth/login",
  async (input: LoginInput, { rejectWithValue }) => {
    try {
      const response: any = await loginUser(input);
      if (response.data.status !== 200) {
        return rejectWithValue(response.data.message);
      }
      localStorage.setItem("token", response.data.data!.token);
      return response.data.data!.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = localStorage.getItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export const AuthReducer = authSlice.reducer;
