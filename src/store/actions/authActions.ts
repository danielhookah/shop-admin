import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, register } from "api/auth";
import { ILogin, IRegister } from "types/forms/auth";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: ILogin, { rejectWithValue }) => {
    try {
      const response = await login(data);
      const { user, token } = response;
      // localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message)
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const response = await register(data);
      const { user, token } = response;
      // localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message)
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (data, { rejectWithValue }) => {
    try {
      await logout();
      // localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('token');

      return {};
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message)
    }
  }
);
