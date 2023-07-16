import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from "api/attributes";

export const getAttributes = createAsyncThunk(
  'attributes/get',
  async (filters: {}, { rejectWithValue }) => {
    try {
      const response = await get();
      return [...response];
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message)
    }
  }
);
