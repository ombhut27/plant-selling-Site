import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DisplayProductAPI } from "../../services/apiService";

export const fetchDisplayProducts = createAsyncThunk(
  "DisplayProducts/fetchDisplayProducts",
  async () => {
    const response = await DisplayProductAPI();
    return response.data.products;
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const displayProductsSlice = createSlice({
  name: "DisplayProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisplayProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDisplayProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchDisplayProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default displayProductsSlice.reducer;
