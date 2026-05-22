import { configureStore } from '@reduxjs/toolkit'; 
import cartReducer from '../../features/cartSlice.jsx';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});