import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../actions/authActions";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = null
        state.token = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { cleanUp } = authSlice.actions;

export default authSlice.reducer;
