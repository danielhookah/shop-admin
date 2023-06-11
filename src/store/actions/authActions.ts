import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI } from 'api/auth';
import { ILogin } from "types/forms/auth";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: ILogin, { rejectWithValue }) => {
    try {
      const response = await loginAPI(data);
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
