import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import productReducer from './reducers/productSlice';
import attributeReducer from './reducers/attributeSlice';
import categoryReducer from './reducers/categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    attribute: attributeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;
