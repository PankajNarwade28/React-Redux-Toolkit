import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAuctionStats = createAsyncThunk(
  'auction/fetchStats',
  async () => {
    const response = await fetch('https://bpl-backend.onrender.com/api/auction/stats');
    const data = await response.json();
    return data.stats; // This contains totalPlayers, soldPlayers, and highestSale
  }
);

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    stats: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuctionStats.pending, (state) => { state.loading = true; })
      .addCase(fetchAuctionStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      });   
  },
});

export default auctionSlice.reducer;