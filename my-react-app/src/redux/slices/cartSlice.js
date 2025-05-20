import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddCartAPI, UpdateCartAPI, GetUserCartAPI } from '../../services/apiService';


export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetUserCartAPI();
      const cartData = response.data.cartData;

      const transformedCart = Object.entries(cartData).reduce((acc, [itemId, quantity]) => {
        acc[itemId] = { quantity };
        return acc;
      }, {});

      return transformedCart;
    } catch (error) {
      console.error('Fetch user cart failed:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ itemId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cartItems = structuredClone(state.cart.cartItems);

      if (cartItems[itemId]) {
        cartItems[itemId].quantity += 1;
      } else {
        cartItems[itemId] = { quantity: 1 };
      }

      const payload = {
        itemId,
        quantity: cartItems[itemId].quantity,
      };

      await AddCartAPI(payload);

      return cartItems;
    } catch (error) {
      console.error('Add to cart failed:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to add item');
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const payload = { itemId, quantity };

      await UpdateCartAPI(payload);

      return { itemId, quantity };
    } catch (error) {
      console.error('Update cart quantity failed:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update quantity');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { getState, rejectWithValue }) => {
    try {
      const payload = { itemId, quantity: 0 };

      await UpdateCartAPI(payload);

      const state = getState();
      const updatedCartItems = { ...state.cart.cartItems };
      delete updatedCartItems[itemId];

      return updatedCartItems;
    } catch (error) {
      console.error('Remove from cart failed:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
    }
  }
);


const DELIVERY_OPTIONS = {
  standard: 10,
  fast: 30,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: {},
    loading: false,
    error: null,
    deliveryType: 'standard',
    deliveryFees: DELIVERY_OPTIONS,
  },
  reducers: {
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = {};
      }
      state.cartItems[itemId].quantity = quantity;
    },
    resetCart: (state) => {
      state.cartItems = {};
      state.loading = false;
      state.error = null;
    },
    clearCart: (state) => {
      state.cartItems = {};
    },
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || {};
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { itemId, quantity } = action.payload;
        state.loading = false;
        if (!state.cartItems[itemId]) {
          state.cartItems[itemId] = {};
        }
        state.cartItems[itemId].quantity = quantity;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateQuantity, resetCart, clearCart, setDeliveryType } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const getCartAmount = (state) => {
  const cartItems = state.cart.cartItems;
  const products = state.DisplayProducts?.products || [];

  let totalAmount = 0;

  for (const itemId in cartItems) {
    const product = products.find((p) => p._id === itemId);
    if (!product) continue;

    const quantity = cartItems[itemId]?.quantity || 0;
    if (quantity > 0) {
      totalAmount += product.price * quantity;
    }
  }

  return totalAmount;
};

export const getFinalCartAmount = (state) => {
  const baseAmount = getCartAmount(state);
  const deliveryType = state.cart.deliveryType;
  const deliveryFees = state.cart.deliveryFees;

  const fee = deliveryFees[deliveryType] || 0;
  return baseAmount + fee;
};
