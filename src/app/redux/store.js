import { configureStore } from '@reduxjs/toolkit'; 
import counterReducer from '../../features/counterSlice.jsx';
import auctionReducer from '../../features/auctionSlice.jsx';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auction: auctionReducer,
  },
});