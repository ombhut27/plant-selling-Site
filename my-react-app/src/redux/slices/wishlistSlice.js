import { createSlice } from '@reduxjs/toolkit';
import { AddWishlistPI, RemoveWishlistAPI, GetUserWishlistAPI } from '../../services/apiService'; 

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: {},
  },
  reducers: {
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action) => {
      state.items[action.payload] = true;
    },
    removeFromWishlist: (state, action) => {
      delete state.items[action.payload];
    },
    resetWishlist: (state) => {
      state.items = {};
    },
  },
});

export const { setWishlistItems, addToWishlist, removeFromWishlist, resetWishlist, } = wishlistSlice.actions;


export const getUserWishlist = (token) => async (dispatch) => {
  try {
    const response = await GetUserWishlistAPI({ token });
    if (response.data.success) {
      dispatch(setWishlistItems(response.data.wishlistData));
    }
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
};


export const addItemToWishlist = (itemId, token) => async (dispatch) => {
  try {
    await AddWishlistPI({ itemId, token });
    dispatch(addToWishlist(itemId));
  } catch (error) {
    console.error('Error adding to wishlist:', error);
  }
};


export const removeItemFromWishlist = (itemId, token) => async (dispatch) => {
  try {
    await RemoveWishlistAPI({ itemId, token });
    dispatch(removeFromWishlist(itemId));
  } catch (error) {
    console.error('Error removing from wishlist:', error);
  }
};

export default wishlistSlice.reducer;