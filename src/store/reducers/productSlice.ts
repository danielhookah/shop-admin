import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../actions/authActions";
import { Product } from "../../types/product";
import { createProduct, updateProduct, getProductsByUserId, deleteProduct } from "../actions/productActions";

interface ProductState {
  products: Product[];
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.products = [];
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.products = state.products.map(el => el.id === action.payload.id ? action.payload : el)
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{id: string}>) => {
        state.isLoading = false;
        state.products = state.products.filter(el => el.id !== action.payload.id)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getProductsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByUserId.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = [...action.payload];
      })
      .addCase(getProductsByUserId.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { cleanUp, addProduct } = productSlice.actions;

export default productSlice.reducer;
