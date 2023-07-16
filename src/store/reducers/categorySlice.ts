import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "types/category";
import { getCategories } from "../actions/categoryActions";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { cleanUp } = categorySlice.actions;

export default categorySlice.reducer;
