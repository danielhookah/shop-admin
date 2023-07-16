import { createAsyncThunk } from "@reduxjs/toolkit";
import { create, deleteItem, getByUserId, update } from "api/products";

export const getProductsByUserId = createAsyncThunk(
  "products/getProductsByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getByUserId(userId);
      return [...response];
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await create(data);
      return { ...response };
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await update(data);
      return { ...response };
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  },
);


export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteItem(id);
      return { id };
    } catch (error: any) {
      if (error?.response?.data) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  },
);
