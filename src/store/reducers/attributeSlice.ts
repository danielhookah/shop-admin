import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attribute } from "types/attribute";
import { getAttributes } from "../actions/attributeActions";

interface AttributeState {
  attributes: Attribute[];
  isLoading: boolean;
}

const initialState: AttributeState = {
  attributes: [],
  isLoading: false,
};

const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.attributes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttributes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttributes.fulfilled, (state, action: PayloadAction<Attribute[]>) => {
        state.isLoading = false;
        state.attributes = action.payload;
      })
      .addCase(getAttributes.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { cleanUp } = attributeSlice.actions;

export default attributeSlice.reducer;
