import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PlaceOrderAPI,
  PlaceOrderRazorpayAPI,
  VerifyRazorpayAPI,
  UserOrderAPI // ✅ Importing the UserOrderAPI
} from "../../services/apiService";

// Thunk for placing a standard order
export const placeOrder = createAsyncThunk("order/placeOrder", async (payload, thunkAPI) => {
  try {
    const response = await PlaceOrderAPI(payload);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Thunk for placing a Razorpay order
export const placeOrderRazorpay = createAsyncThunk("order/placeOrderRazorpay", async (payload, thunkAPI) => {
  try {
    const response = await PlaceOrderRazorpayAPI(payload);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const verifyRazorpay = createAsyncThunk("order/verifyRazorpay", async (payload, thunkAPI) => {
  try {
    const response = await VerifyRazorpayAPI(payload);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const userOrder = createAsyncThunk("order/userOrder", async (payload, thunkAPI) => {
  try {
    const response = await UserOrderAPI(payload);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    success: false,
    userOrderData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Place order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Razorpay order
      .addCase(placeOrderRazorpay.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrderRazorpay.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(placeOrderRazorpay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Razorpay verification
      .addCase(verifyRazorpay.fulfilled, (state) => {
        state.success = true;
      })

      // User Order fetch
      .addCase(userOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrderData = action.payload;
      })
      .addCase(userOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
