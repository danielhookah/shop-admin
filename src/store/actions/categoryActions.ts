import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from "api/categories";

export const getCategories = createAsyncThunk(
  'categories/get',
  async (filters: {}, { rejectWithValue }) => {
    try {
      console.log(122)
      const response = await get();
      console.log(response)
      return [...response];
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message)
    }
  }
);
