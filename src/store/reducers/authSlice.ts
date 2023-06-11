import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../actions/authActions';

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
